import { combineReducers } from "redux";
import alert from "./Alert";
import Auth from "./Auth";
export default combineReducers({ alert, auth: Auth });
