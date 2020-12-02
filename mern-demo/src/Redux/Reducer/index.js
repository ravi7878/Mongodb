import { combineReducers } from "redux";
import alert from "./Alert";
import Auth from "./Auth";
import Profile from "./Profile";
export default combineReducers({ alert, auth: Auth, profile: Profile });
