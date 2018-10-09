import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from "history/createBrowserHistory";

import reducers from './reducers';
import saga from './reducers/sagas/saga';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware(history);

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(saga);
