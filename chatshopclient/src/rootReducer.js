// rootReducer.js
import { combineReducers } from "redux";
import userReducer from "./reducers";

const rootReducer = combineReducers({
  userData: userReducer,
  // add other reducers if needed
});

export default rootReducer;
