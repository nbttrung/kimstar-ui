import axios from "axios";
import {BASE_PATH} from "../config/Url";

export const DG_axiosSpecial = axios.create({
    baseURL: `${BASE_PATH}`,
    headers: {
        "Content-Type": "application/json"
    },
});
