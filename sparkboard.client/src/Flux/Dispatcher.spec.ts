import { describe, beforeEach, it } from "node:test";
import { Dispatcher } from "./Dispatcher";

/********************************************************************************************************************************************************
 * This is legacy test code and may not follow our testing guidelines and best practices - Be careful when you search for something to copy + paste
 ********************************************************************************************************************************************************/

describe("Dispatcher", () => {
  let dispatcher: Dispatcher<Object>;

  let callbacks: {
    one: jest.Mock;
    two: jest.Mock;
  };

  let tokens: {
    one: string;
    two: string;
  };

  let payloads: {
    one: { id: number };
    two: { id: number };
  };

  beforeEach(() => {
    dispatcher = new Dispatcher<Object>();

    callbacks = {
      one: jest.fn(),
      two: jest.fn(),
    };

    tokens = {
      one: null,
      two: null,
    };

    payloads = {
      one: { id: 1 },
      two: { id: 2 },
    };
  });

  describe("dispatch()", () => {
    it("should execute all registered callbacks and pass the dispatched payload to them", () => {
      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.one.mock.calls.length).toEqual(1); // 1 dispatch has been performed
      expect(callbacks.two).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.two.mock.calls.length).toEqual(1); // 1 dispatch has been performed

      dispatcher.dispatch(payloads.two);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.two);
      expect(callbacks.one.mock.calls.length).toEqual(2); // 2 dispatches have been performed
      expect(callbacks.two).toHaveBeenCalledWith(payloads.two);
      expect(callbacks.two.mock.calls.length).toEqual(2); // 2 dispatches have been performed
    });

    it("should throw an error when it is called while a dispatch is already in progress", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        expect(() => dispatcher.dispatch({})).toThrow();
      });

      tokens.one = dispatcher.register(callbacks.one);

      dispatcher.dispatch(payloads.one);
    });

    it("should remain in a consistent state after a failed dispatch", () => {
      callbacks.two.mockImplementation((payload: { throw: boolean }) => {
        if (payload.throw) {
          throw new Error();
        }
      });

      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      expect(() => dispatcher.dispatch({ throw: true })).toThrow();

      expect(callbacks.one.mock.calls.length).toEqual(1); // 1 dispatch has been performed
      expect(callbacks.two.mock.calls.length).toEqual(1); // 1 dispatch has been performed

      dispatcher.dispatch({ throw: false });

      expect(callbacks.one.mock.calls.length).toEqual(2); // 2 dispatches have been performed
      expect(callbacks.two.mock.calls.length).toEqual(2); // 2 dispatches have been performed
    });

    it("should pass-through errors that have been thrown in callbacks", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        throw new Error();
      }); // Use of any to allow throwing an error.

      tokens.one = dispatcher.register(callbacks.one);

      expect(() => dispatcher.dispatch(payloads.one)).toThrow();
    });
  });

  describe("register()", () => {
    it("should throw an error when called while a dispatch is in progress", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        dispatcher.register(callbacks.two);
      });
      tokens.one = dispatcher.register(callbacks.one);

      dispatcher.dispatch(payloads.one);

      expect(dispatcher.register).toThrow();
    });
  });

  describe("unregister()", () => {
    it("should properly unregister callbacks", () => {
      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.one.mock.calls.length).toEqual(1); // 1 dispatch has been performed
      expect(callbacks.two).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.two.mock.calls.length).toEqual(1); // 1 dispatch has been performed

      dispatcher.unregister(tokens.two);

      dispatcher.dispatch(payloads.two);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.two);
      expect(callbacks.one.mock.calls.length).toEqual(2); // 2 dispatches have been performed
      expect(callbacks.two).not.toHaveBeenCalledWith(payloads.two);
      expect(callbacks.two.mock.calls.length).toEqual(1); // callbacks.two has been unregistered before payloads.two has been dispatched
    });

    it("should throw an error when called while a dispatch is in progress", () => {
      callbacks.two.mockImplementation((payload: Object) => {
        dispatcher.unregister(tokens.one);
      });
      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);

      expect(callbacks.two).toThrow();
    });

    it("should throw an error when a token is passed to it that does not map to a registered callback", () => {
      expect(() => dispatcher.unregister("ID_1234")).toThrow();
    });
  });

  describe("waitFor()", () => {
    it("should wait for callbacks that where registered before the callback that calls waitFor()", () => {
      callbacks.two.mockImplementation((payload: Object) => {
        dispatcher.waitFor(tokens.one);

        expect(callbacks.one).toHaveBeenCalledWith(payloads.one);
        expect(callbacks.one.mock.calls.length).toEqual(1); // this is the first dispatch
      });

      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.one.mock.calls.length).toEqual(1); // 1 dispatch has been performed
      expect(callbacks.two).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.two.mock.calls.length).toEqual(1); // 1 dispatch has been performed
    });

    it("should wait for callbacks that where registered after the callback that calls waitFor()", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        dispatcher.waitFor(tokens.two);

        expect(callbacks.two).toHaveBeenCalledWith(payloads.one);
        expect(callbacks.two.mock.calls.length).toEqual(1); // this is the first dispatch
      });

      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);

      expect(callbacks.one).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.one.mock.calls.length).toEqual(1); // 1 dispatch has been performed

      expect(callbacks.two).toHaveBeenCalledWith(payloads.one);
      expect(callbacks.two.mock.calls.length).toEqual(1); // 1 dispatch has been performed
    });

    it("should throw an error when it is called while no dispatch is in progress", () => {
      tokens.one = dispatcher.register(callbacks.one);

      expect(() => dispatcher.waitFor(tokens.one)).toThrow();
    });

    it("should throw an error when a token is passed to it that does not map to a registered callback", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        expect(() => dispatcher.waitFor("ID_1234")).toThrow();
      });

      dispatcher.register(callbacks.one);

      dispatcher.dispatch(payloads.one);
    });

    it("should throw an error when it detects a single level circular dependency (a callback is trying to wait for itself, A > A)", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        expect(() => dispatcher.waitFor(tokens.one)).toThrow();
      });

      tokens.one = dispatcher.register(callbacks.one);

      dispatcher.dispatch(payloads.one);
    });

    it("should throw an error when it detects a multi level circular dependency (a callback is trying to wait for another callback and the other callback tries to wait for the first callback, A > B > A)", () => {
      callbacks.one.mockImplementation((payload: Object) => {
        dispatcher.waitFor(tokens.two);
      });

      callbacks.two.mockImplementation((payload: Object) => {
        expect(() => dispatcher.waitFor(tokens.one)).toThrow();
      });

      tokens.one = dispatcher.register(callbacks.one);
      tokens.two = dispatcher.register(callbacks.two);

      dispatcher.dispatch(payloads.one);
    });
  });
});
