/**
 * Defines a method to release allocated resources.
 */
export interface IDisposable {
  /**
   * Performs application-defined tasks associated with freeing, releasing or resetting resources.
   */
  dispose: () => void;
}
