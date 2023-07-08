import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { counterReducer, UserReducer } from './reducers';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  Counter: counterReducer,
  User: UserReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
