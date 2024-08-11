import { ActionSource } from "./ActionSource";

/**
 * Represents an action in a Flux Application Architecture.
 *
 * For details about the Flux Architecture see https://facebook.github.io/flux/docs/overview.html.
 */
export abstract class Action {
  /**
   * Specifies the source of the action.
   */
  public source: ActionSource;
}
