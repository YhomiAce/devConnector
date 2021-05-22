import { combineReducers } from "redux";
import AlertReducer from "./alert";
import AuthReducer from './auth'

// export default combineReducers({
//     alert
// });
const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: AuthReducer
});

export default rootReducer;
