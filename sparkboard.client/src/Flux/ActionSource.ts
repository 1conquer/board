/**
 * Defines the source of an Action in a Flux Application Architecture.
 *
 * For details about the Flux Architecture see https://facebook.github.io/flux/docs/overview.html.
 */
export enum ActionSource {
  /**
   * The source of the action is a response or a signalR call from a server.
   */
  Server = 0,

  /**
   * The source of the action is the client.
   */
  Client = 1,
}
