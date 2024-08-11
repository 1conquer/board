import { Dictionary } from "../Common/Collections/Dictionary";
import { DispatcherCallbackInfo } from "./DispatcherCallbackInfo";
import { Action } from "./Action";

/**
 * A Flux Application Architecture dispatcher that dispatches a payload to registered callbacks (usually Flux stores).
 *
 * For details about the Flux Architecture see https://facebook.github.io/flux/docs/overview.html.
 */
export class Dispatcher<TPayload = Action> {
  /**
   * Initializes a new instance of this class.
   */
  constructor() {
    this.callbacks = new Dictionary<string, DispatcherCallbackInfo<TPayload>>();
    this.isDispatching = false;
    this.currentPayload = null;
    this.lastToken = 1;
  }

  /**
   * Registers a callback to be invoked for every dispatched payload.
   *
   * @param callback The callback to be invoked when a payload is dispatched.
   * @returns A token under which the callback is known to the dispatcher. This token can be used with the waitFor() method.
   */
  public register(callback: (payload: TPayload) => void): string {
    var token = this.getNextCallbackToken();

    this.callbacks.set(
      token,
      new DispatcherCallbackInfo<TPayload>(callback, token)
    );

    return token;
  }

  /**
   * Unregisters a callback (identified by its token) from the dispatcher.
   * Once a callback is unregistered it will no longer be invoked when a payload is dispatched.
   *
   * @param token The token of the callback that should be unregistered.
   */
  public unregister(token: string): void {
    if (!this.existsCallback(token)) {
      throw new Error(
        `Dispatcher.unregister(): The token '${token}' does not map to a registered callback.`
      );
    }

    this.callbacks.remove(token);
  }

  /**
   * Waits for the specified callbacks to be invoked before continuing execution of the current callback.
   * This method should only be used by a callback in response to a dispatched payload.
   *
   * @param tokens The tokens of the callbacks to wait for.
   */
  public waitFor(...tokens: string[]): void {
    if (!this.isDispatching) {
      throw new Error(
        `Dispatcher.waitFor(): Cannot be called when no dispatch is in progress.`
      );
    }

    for (const token of tokens) {
      if (!this.existsCallback(token)) {
        throw Error(
          `Dispatcher.waitFor(): The token '${token}' does not map to a registered callback.`
        );
      }

      if (this.isCallbackExecuting(token)) {
        /* If a callback is waiting for another callback that is currently executing (and has not finished executing yet), we have a circular dependency.

                   E.g. when A is waiting for B and B is waiting for A the following would happen:
                   1. A gets executed.
                   2. A waits for B (A is still executing).
                   3. Therefore B gets executed (A is still executing).
                   4. B waits for A (A is still executing).
                   5. We notice that A is still executing (and has not finished yet), so we have a circular dependency.
                */

        throw Error(
          `Dispatcher.waitFor(): Circular dependency detected while waiting for '${token}' (e.g. A waits for B and B waits for A).`
        );
      }

      if (this.hasCallbackExecuted(token)) {
        // If the caller waits for a callback that has already been executed, we can ignore that callback.
        continue;
      }

      this.executeCallback(token);
    }
  }

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param payload The payload to dispatch.
   */
  public dispatch(payload: TPayload): void {
    if (this.isDispatching) {
      const currentPayloadAsString = this.convertPayloadToString(
        this.currentPayload
      );
      throw new Error(
        `Dispatcher.dispatch(): Cannot be called while a dispatch is in progress. Currently dispatching payload is: ${currentPayloadAsString}`
      );
    }

    this.startDispatch(payload);

    try {
      for (const token of this.callbacks.keys) {
        if (!this.existsCallback(token) || this.hasCallbackExecuted(token)) {
          /*
                     The callback might have been unregistered while executing one of the previous callbacks or
                     the callback might already have been executed because a previous callback called Dispatcher.waitFor() for the callback.

                     Example:
                     var tokenA = dispatcher.register(() => { dispatcher.waitFor(tokenB); });
                     var tokenB = dispatcher.register(() => {});
                     dispatcher.dispatch(payload);

                     In this case the following happens:
                     2. dispatch() is called.
                     3. dispatch() processes callback A.
                     4. Callback A calls waitFor() for callback B.
                     5. waitFor() executes callback B.
                     6. dispatch() continues and processes callback B.
                     7. Callback B has already been executed (by waitFor()).

                     In this case we can ignore callback B and must not call it again.
                    */

          continue;
        }

        this.executeCallback(token);
      }
    } finally {
      this.stopDispatch();
    }
  }

  /**
   * Determines if the dispatcher is currently dispatching a payload.
   *
   * @returns True if the dispatcher is currently dispatching a payload, otherwise false.
   */
  public getIsDispatching(): boolean {
    return this.isDispatching;
  }

  private startDispatch(payload: TPayload): void {
    for (const callbackInfo of this.callbacks.values) {
      callbackInfo.isExecuting = false;
      callbackInfo.hasExecuted = false;
    }

    this.currentPayload = payload;
    this.isDispatching = true;
  }

  private stopDispatch(): void {
    for (const callbackInfo of this.callbacks.values) {
      callbackInfo.isExecuting = false;
      callbackInfo.hasExecuted = false;
    }

    this.currentPayload = null;
    this.isDispatching = false;
  }

  private executeCallback(callbackToken: string): void {
    const callbackInfo = this.callbacks.get(callbackToken);

    callbackInfo.isExecuting = true;

    callbackInfo.callback(this.currentPayload);

    callbackInfo.isExecuting = false;
    callbackInfo.hasExecuted = true;
  }

  private isCallbackExecuting = (callbackToken: string): boolean => {
    return this.callbacks.get(callbackToken).isExecuting;
  };

  private hasCallbackExecuted = (callbackToken: string): boolean => {
    return this.callbacks.get(callbackToken).hasExecuted;
  };

  private existsCallback = (callbackToken: string): boolean => {
    return this.callbacks.containsKey(callbackToken);
  };

  private getNextCallbackToken = (): string => {
    return Dispatcher.tokenPrefix + this.lastToken++;
  };

  private convertPayloadToString(payload: any): string {
    if (typeof payload === "object") {
      if (payload.constructor != null) {
        const constructorAsString = payload.constructor.toString();
        var parts = /function (.*)\(/.exec(constructorAsString);

        if (parts != null) {
          return parts[1];
        }

        return constructorAsString;
      }
    }

    return payload.toString();
  }

  private callbacks: Dictionary<string, DispatcherCallbackInfo<TPayload>>;

  private isDispatching: boolean;

  private currentPayload: TPayload;

  private lastToken: number;

  private static tokenPrefix = "ID_";
}
