import {call, fork, put, takeEvery} from "@redux-saga/core/effects";
import {signIn} from "../../../api/login/api";
import {loginError, loginSuccess} from "../../actions/login/actions";
import {loginTypes} from "../../actions/login/types";

function* onLoginStartAsync(action) {
    try {
        const {username, password} = action;

        const response = yield call(
            signIn,
            username,
            password,
        )
        if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.result.access_token);
            localStorage.setItem("refreshToken", response.data.result.refresh_token);
            yield put(loginSuccess());
        }
    } catch (error) {
        yield put(loginError(error?.response?.data));
    }
}

function* onLogin() {
    yield takeEvery(loginTypes.REQUEST, onLoginStartAsync);
}

function* onLogoutStartAsync() {
    try {
    } finally {
        window.localStorage.clear();
        window.location.href = `/login`;
    }
}

function* onLogout() {
    yield takeEvery(
        loginTypes.LOGOUT,
        onLogoutStartAsync
    );
}

const login = [fork(onLogin), fork(onLogout)];

export default login;
