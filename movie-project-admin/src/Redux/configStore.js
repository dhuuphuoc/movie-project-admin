import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import QuanLyPhimReducer from "./reducer/QuanLyPhimReducer";
import QuanLyAccountReducer from "./reducer/QuanLyAccountReducer";
import QuanLyUserReducer from "./reducer/QuanLyUserReducer";

const rootReducer = combineReducers({
  QuanLyPhimReducer,
  QuanLyAccountReducer,
  QuanLyUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
