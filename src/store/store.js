import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ducks from './ducks/ducks';
import sagas from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(ducks, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas);

export default store;
