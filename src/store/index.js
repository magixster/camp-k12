import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

// Reducers
import rootSaga from "./rootSaga";

//Sagas
import rootReducer from "./rootReducer";


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);

export default createStore(rootReducer, enhancer);

// then run the saga
sagaMiddleware.run(rootSaga);
