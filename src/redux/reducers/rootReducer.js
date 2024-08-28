import {combineReducers} from "redux";
import layoutInteractionReducer from "./layout/interaction/Layout";
import loginReducer from "./login/login";
import axiosReducer from "./axios/reducer";
import actionHistoryReducer from "./action-history/reducer";
import permissionAccountActionReducer from "./permission/permission";

const rootReducer = combineReducers({
    layoutInteractionReducer,
    loginReducer,
    axiosReducer,
    actionHistoryReducer,
    permissionAccountActionReducer
});

export default rootReducer;
