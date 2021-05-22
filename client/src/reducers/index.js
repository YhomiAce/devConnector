import { combineReducers } from "redux";
import AlertReducer from "./alert";
import AuthReducer from "./auth";
import ProfileReducer from "./profile";

// export default combineReducers({
//     alert
// });
const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});

export default rootReducer;
