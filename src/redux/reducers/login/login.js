import {loginTypes} from "../../actions/login/types";

const initialState = {
    loggedInSuccess: false,
    error: null,
    loadingLogin: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginTypes.UPDATE_USERNAME_PASSWORD:
            return {
                ...state,
                username: action.username,
                password: action.password
            }
        case loginTypes.REQUEST:
            return {
                ...state,
                loginProgress: true,
                loggedInSuccess: false,
                loadingLogin: true
            };
        case loginTypes.SUCCESS:
            return {
                ...state,
                loggedInSuccess: true,
                error: null,
                loadingLogin: false
            };
        case loginTypes.FAILURE:
            return {
                ...state,
                error: action.error,
                loggedInSuccess: false,
                loadingLogin: false
            };
        case loginTypes.LOGOUT: {
            return {
                ...state,
                loggedInSuccess: false,
                loadingLogin: false
            };
        }
        case loginTypes.LOADING_LOGIN:
            return {
                ...state,
                loadingLogin: true
            }
        default:
            return state;
    }
};

export default loginReducer;
