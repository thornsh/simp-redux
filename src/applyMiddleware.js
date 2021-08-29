export default function applyMiddleware(middlewares) {
  return (createStore) => (reducer, state) => {
    const store = createStore(reducer, state);

    let dispatch = () => {};

    let middlewareApi = {
      dispatch: (action, ...args) => dispatch(action, ...args),
      getState: store.getState,
    };

    let chain = middlewares.map((middleware) => middleware(middlewareApi));

    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (...args) => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return (...args) => funcs.reduce((a, b) => a(b(...args)));
}
