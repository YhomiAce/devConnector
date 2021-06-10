import { combineReducers } from "redux";
import AlertReducer from "./alert";
import AuthReducer from "./auth";
import postReducer from "./post";
import ProfileReducer from "./profile";

// export default combineReducers({
//     alert
// });
const rootReducer = combineReducers({
  alert: AlertReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  post: postReducer,
});

export default rootReducer;
