import {
    getLocalAccessToken,
    updateLocalAccessToken,
    updateLocalRefreshToken
} from "../index";
import {
    DG_axiosSpecial as axiosInstance
} from "./index";
import {message} from "antd";
import {refreshToken} from "../../../api/login/api";
import {logoutStart} from "../../../redux/actions/login/actions";
import {t} from "i18next";

let refreshTokenRequest = null;
const setupSpecial = (store) => {

    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = getLocalAccessToken();
            config.headers["dogoo-x-user-context-request"] = accessToken;
            return config;

        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            const response = err.response;


            const data = response?.data;
            const status = response?.status

            if (status === 404) {
                message.error(t("notification.404"))
            } else if (data?.status === "INTERNAL_SERVER_ERROR") {
                message.error(t("notification.500"))
            } else if(status === 403){

            } else {
                const detail = data?.detail || data?.message || data?.title || data?.status || t("notification.500")
                message.error(detail)
            }

            // Access Token was expired
            if (status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    refreshTokenRequest = refreshTokenRequest
                        ? refreshTokenRequest
                        : refreshToken();

                    const rs = await refreshTokenRequest;
                    refreshTokenRequest = null;
                    const {access_token} = rs.data.result;
                    const {refresh_token} = rs.data.result;
                    updateLocalAccessToken(access_token);
                    updateLocalRefreshToken(refresh_token);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    store.dispatch(logoutStart());
                    return Promise.reject(_error);
                }
            }

            if (status === 401 && !originalConfig._retry) {
                store.dispatch(logoutStart());
            }

            return Promise.reject(err);
        }
    );
};
export default setupSpecial;
