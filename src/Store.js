/*eslint-env browser*/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { SIGN_OUT } from './redux/Login/actionTypes';
import LoginReducer from './redux/Login/reducer';

const appReducer = combineReducers({
  login: LoginReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined
  }
  return appReducer(state, action);
}

const win = window;
// win.Perf = Perf;

const middlewares = [];

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const store = createStore(rootReducer, {}, storeEnhancers);

export default store;
