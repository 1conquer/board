import { BaseAction } from "../Actions/BaseAction";
import { ProjectChangedAction } from "../Actions/ProjectChangedAction";
import { Action } from "../Common/Flux/Action";
import { Dispatcher } from "../Common/Flux/Dispatcher";
import { Store } from "../Common/Flux/Store";
import { AppState } from "./AppState";

export class AppStore extends Store {
  public constructor(projectGuid: string) {
    super(Dispatcher.Instance);
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

    if (payload instanceof ProjectChangedAction) {
      console.log("zlupa");
      this.hasChanged = true;
    }
    if (!(payload instanceof BaseAction)) {
      return;
    }
  }

  private state: AppState;

  private disposed: boolean;
}
