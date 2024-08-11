import { BaseAction } from "../Actions/BaseAction";
import { Action } from "../Flux/Action";
import { Dispatcher } from "../Flux/Dispatcher";
import { Store } from "../Flux/Store";
import { AppState } from "./AppState";

export class AppStore extends Store {
  public constructor(dispatcher: Dispatcher, projectGuid: string) {
    super(dispatcher);
    this.state = new AppState();
    this.state.projectGuid = projectGuid;
    this.hasChanged = true;
    this.disposed = false;
  }

  public getState(): AppState {
    return this.state;
  }

  public dispose(): void {
    this.disposed = true;
    super.dispose();
  }

  protected onDispatch(payload: Action): void {
    if (this.disposed) {
      return;
    }

    if (!(payload instanceof BaseAction)) {
      return;
    }
    this.hasChanged = false;
  }

  private state: AppState;

  private disposed: boolean;
}
