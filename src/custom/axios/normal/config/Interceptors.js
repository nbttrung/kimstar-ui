import {DG_axiosNormal as axiosInstance, updateLocalAccessToken} from "../index";
import {message} from "antd";
import {refreshToken} from "../../../../api/login/api";
import {logoutStart} from "../../../../redux/actions/login/actions";
import {t} from "i18next";

const setupNormal = (store) => {


    axiosInstance.interceptors.request.use(
        (config) => {
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
            } else {
                const detail = data?.detail || data?.message || data?.title || data?.status || t("notification.500")
                message.error(detail)
            }

            if (!originalConfig.url.includes("/public/dogoo/login") && !originalConfig.url.includes("/public/dogoo/refresh-token")) {
                // Access Token was expired
                if (status === 403 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await refreshToken();
                        const {accessToken} = rs.data;
                        updateLocalAccessToken(accessToken);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        store.dispatch(logoutStart());
                        return Promise.reject(_error);
                    }
                }
            }

            if (status === 401 && !originalConfig._retry) {
                store.dispatch(logoutStart());
            }

            return Promise.reject(err);
        }
    );
};
export default setupNormal;
