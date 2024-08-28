import axios from "axios";
import {BASE_PATH} from "../config/Url";
import Cookies from "js-cookie";

export const DG_axiosNormal = axios.create({
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

export const getLanguage = () => {
    return localStorage.getItem("language") || "vi"
}

export const updateLanguage = (language) => {
    localStorage.setItem("language", language)
}
