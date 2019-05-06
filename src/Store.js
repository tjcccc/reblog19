/*eslint-env browser*/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { SIGN_OUT } from './redux/authorization/actionTypes';
import AuthorizationReducer from './redux/authorization/reducer';
import CategoryReducer from './redux/category/reducer';
import TagReducer from './redux/tag/reducer';
import PostReducer from './redux/post/reducer';
import EditingPostReducer from './redux/editing-post/reducer';

const appReducer = combineReducers({
  authorization: AuthorizationReducer,
  category: CategoryReducer,
  tag: TagReducer,
  post: PostReducer,
  editingPost: EditingPostReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined
  }
  return appReducer(state, action);
}

const win = window;
// win.Perf = Perf;

const middleware = [];

const storeEnhancers = compose(
  applyMiddleware(...middleware),
  (win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
);

const store = createStore(rootReducer, {}, storeEnhancers);

export default store;
