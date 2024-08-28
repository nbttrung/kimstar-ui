import {BASE_PATH} from "../../custom/axios/config/Url";
import {DG_axiosNormal} from "../../custom/axios/normal";
import {DG_axiosRefresh} from "../../custom/axios/configRefreshToken";

const BASE_URL_LOGIN = `${BASE_PATH}/public/dogoo/login`;
const BASE_URL_REFRESH_TOKEN = `${BASE_PATH}/public/dogoo/refresh-token`;
const BASE_URL_FORGET_PASSWORD = `${BASE_PATH}/public/dogoo/forget-password`;

export const signIn = (username, password) => {

    return DG_axiosNormal.post(
        BASE_URL_LOGIN,
        {
            email: username,
            password
        }
    );
};

export const refreshToken = () => {
    return DG_axiosRefresh.post(
        BASE_URL_REFRESH_TOKEN
    );
};

export async function forgetPassword(email) {
    const response = await DG_axiosNormal.post(BASE_URL_FORGET_PASSWORD , null, {
        params: {
            email
        }
    })
    return response?.data.result || []
}
