import { Event } from "../Common/Event";
import { IDisposable } from "../Common/IDisposable";
import { Action } from "./Action";
import { Dispatcher } from "./Dispatcher";

/**
 * A Flux Application Architecture store that stores information and handles dispatched actions.
 *
 * For details about the Flux Architecture see https://facebook.github.io/flux/docs/overview.html.
 */
export abstract class Store implements IDisposable {
  /**
   * Initializes a new instance of this class.
   *
   * @param dispatcher The Flux dispatcher the store should listen for new actions to.
   */
  public constructor(dispatcher: Dispatcher<Action>) {
    this.dispatcher = dispatcher;
    this.changed = new Event<void>();
    this.hasChanged = false;

    this.dispatchToken = this.dispatcher.register((payload: Action) => {
      this.invokeOnDispatch(payload);
    });
  }

  /**
   * Returns the dispatcher the store is listening to.
   * @returns The dispatcher the store is listening to.
   */
  public getDispatcher(): Dispatcher<Action> {
    return this.dispatcher;
  }

  /**
   * Returns the dispatch token of the store.
   * @returns The dispatch token of the store.
   */
  public getDispatchToken(): string {
    return this.dispatchToken;
  }

  /**
   * Determines if the store has changed during the most recent dispatch.
   * @returns True if the store has changed during the most recent dispatch, otherwise false.
   */
  public getHasChanged(): boolean {
    return this.hasChanged;
  }

  /**
   * Releases allocated resources of the store.
   */
  public dispose(): void {
    this.dispatcher.unregister(this.dispatchToken);
  }

  /**
   * An event that will fire when the store has changed during the current dispatch.
   */
  public changed: Event<void>;

  /**
   * Handles a new dispatched action.
   * This method must be overridden by subclasses to handle incoming actions.
   *
   * @param payload The action to handle.
   */
  protected abstract onDispatch(payload: Action): void;

  /**
   * Determines if the store has changed during the most recent dispatch.
   */
  protected hasChanged: boolean;

  private invokeOnDispatch(payload: Action): void {
    this.hasChanged = false;

    this.onDispatch(payload);

    if (this.hasChanged) {
      this.changed.invoke();
    }
  }

  private dispatcher: Dispatcher<Action>;
  private dispatchToken: string;
}
