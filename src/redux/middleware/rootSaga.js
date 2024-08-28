import {all} from "redux-saga/effects";
import login from "./login/login";
import permissionsAccountData from "./permission/accountMiddleware";


export default function* rootSaga() {
    yield all([
        ...login,
        ...permissionsAccountData
    ]);
}
