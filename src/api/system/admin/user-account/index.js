import jwtDecode from "jwt-decode";
import {store} from "../../../../redux/store/store";
import {logoutStart} from "../../../../redux/actions/login/actions";

export const getMe = () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        return jwtDecode(accessToken);
    } catch (e) {
        store.dispatch(logoutStart())
    }
}

export const getMeLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken){
        return jwtDecode(accessToken);
    }

    return undefined
}
