export const loggingMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};
