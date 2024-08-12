/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @flow
 * @preventMunge
 */

"use strict";

import { Action } from "./Action";

export type DispatchToken = string;

var _prefix = "ID_";

export class Dispatcher {
  private static _instance: Dispatcher;

  _callbacks: { [key: DispatchToken]: (payload: Action) => void };
  _isDispatching: boolean;
  _isHandled: { [key: DispatchToken]: boolean };
  _isPending: { [key: DispatchToken]: boolean };
  _lastID: number;
  _pendingPayload: Action;

  constructor() {
    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
    this._pendingPayload = {};
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */
  register(callback: (payload: Action) => void): DispatchToken {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  }

  /**
   * Removes a callback based on its token.
   */
  unregister(id: DispatchToken): void {
    delete this._callbacks[id];
  }

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */
  waitFor(ids: Array<DispatchToken>): void {
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  }

  /**
   * Dispatches a payload to all registered callbacks.
   */
  dispatch(payload: Action): void {
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  }

  /**
   * Is this Dispatcher currently dispatching.
   */
  isDispatching(): boolean {
    return this._isDispatching;
  }

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */
  _invokeCallback(id: DispatchToken): void {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */
  _startDispatching(payload: Action): void {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  _stopDispatching(): void {
    delete this._pendingPayload;
    this._isDispatching = false;
  }
}
