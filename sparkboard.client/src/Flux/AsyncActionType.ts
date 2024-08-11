/**
 * Defines the type of an asynchronous action.
 */
export enum AsyncActionType {
  /**
   * The action will trigger a request.
   */
  Request = 0,

  /**
   * The action contains a success response.
   */
  Success = 1,

  /**
   * The action contains an error response.
   */
  Error = 2,
}
