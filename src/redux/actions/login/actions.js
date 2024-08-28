import {loginTypes} from "./types";

export const updateUsernamePassword = (username, password) => ({
    type: loginTypes.UPDATE_USERNAME_PASSWORD,
    username,
    password
})

export const loginStart = ({username, password}) => ({
    type: loginTypes.REQUEST,
    username,
    password,
    loggedInSuccess: false
});

export const loginSuccess = () => ({
    type: loginTypes.SUCCESS,
    loggedInSuccess: true
});

export const loginError = (error) => ({
    type: loginTypes.FAILURE,
    error: error,
    loginSuccess: false,
});


export const logoutStart = () => ({
    type: loginTypes.LOGOUT,
});

export const loadingLogin = () => ({
    type: loginTypes.LOADING_LOGIN
})
