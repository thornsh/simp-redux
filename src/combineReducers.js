export default function combineReducers(reducers) {
  return function indexReducer(state, action) {
    let indexState = {};
    for (let [key, reducer] of Object.entries(reducers)) {
      indexReducer[key] = reducer(state[key], action);
    }

    return indexState;
  };
}
