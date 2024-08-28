import {getLocalRefreshToken} from "../index";
import {logoutStart} from "../../../redux/actions/login/actions";
import {DG_axiosRefresh as axiosInstance} from "./index";
const setupRefresh = (store) => {

    axiosInstance.interceptors.request.use(
        (config) => {
            const refreshToken = getLocalRefreshToken();
            config.headers["dogoo-x-user-context-request-refresh-token"] = refreshToken;
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
            const status = response?.status

            if (status === 401 && !originalConfig._retry) {
                store.dispatch(logoutStart());
            }

            return Promise.reject(err);
        }
    );
};
export default setupRefresh;
