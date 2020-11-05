import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from 'redux-persist';
import createSagaMiddleware from "redux-saga";

//Sagas
import rootSaga from "./rootSaga";

// Reducers
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

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);
// then run the saga
sagaMiddleware.run(rootSaga);
