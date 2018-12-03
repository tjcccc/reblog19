/*eslint-env browser*/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import HeaderReducer from './components/header/header.reducer';

const reducer = combineReducers({
  header: HeaderReducer
});

const win = window;
// win.Perf = Perf;

const middlewares = [];

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const store = createStore(reducer, {}, storeEnhancers);

export default store;
