
export default function loggerMiddleware(store) {
  return next => action => {
    console.log("Dispatching action:")
    console.log(action)

    next(action)

    console.log("State after dispatch:")
    console.log(store.getState())
  }
}
