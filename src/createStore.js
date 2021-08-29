export default function createStore(reducer, initState, enhancer) {
  if (typeof initState === "function" && enhancer === undefined) {
    enhancer = initState;
    initState = undefined;
  }
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, initState);
  }

  let currentState = initState;
  const listeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unSubscribe() {
      const currentIndex = listeners.indexOf(listener);
      listeners.splice(currentIndex, 1);
    };
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    for (let i of listeners) {
      listeners[i]();
    }
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
}
