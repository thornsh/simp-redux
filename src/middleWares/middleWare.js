function middleWare1(middlewareAPI) {
  return (next) => (action) => {
    console.log("do something");

    return next(action);
  };
}
