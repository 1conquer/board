/**
 * Contains information about a callback registered to a Flux Application Architecture dispatcher.
 *
 * For details about the Flux Architecture see https://facebook.github.io/flux/docs/overview.html.
 */
export class DispatcherCallbackInfo<TPayload> {
  /**
   * Initializes a new instance of this class.
   *
   * @param callback The dispatcher callback.
   * @param token The token of the callback.
   */
  constructor(callback: (payload: TPayload) => void, token: string) {
    this.callback = callback;
    this.token = token;
    this.isExecuting = false;
    this.hasExecuted = false;
  }

  /**
   * The dispatcher callback.
   */
  public callback: (payload: TPayload) => void;

  /**
   * The token of the callback.
   */
  public token: string;

  /**
   * Determines if the callback has already been executed in the current dispatch.
   */
  public hasExecuted: boolean;

  /**
   * Determines if the callback is currently executing (and has not finished executing yet).
   */
  public isExecuting: boolean;
}
