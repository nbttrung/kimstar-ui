import axios from "axios";
import {BASE_PATH} from "./config/Url";
import {refreshToken} from "../../api/login/api";


export const DG_axios = axios.create({
    baseURL: `${BASE_PATH}`,
    headers: {
        "Content-Type": "application/json"
    },
});

export const getLocalAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const updateLocalAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

export const updateLocalRefreshToken = (refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
}

export const getLocalRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const getLanguage = () => {
    return localStorage.getItem("language") || "vi"
}

export const updateLanguage = (language) => {
    localStorage.setItem("language", language)
}

export const refreshAccessToken = async () => {
    await refreshToken().then(r => {
        updateLocalAccessToken(r.data.accessToken)
    })
}

