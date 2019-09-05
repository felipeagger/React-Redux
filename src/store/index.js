import { applyMiddleware, createStore, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import history from "../history";
import rootReducer from './reducers';

const initialState = {};

const middleware = [
    routerMiddleware(history),
    thunk
];


const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
      applyMiddleware(...middleware)
  )
);

export default store;