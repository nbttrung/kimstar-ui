import {actionHistoryType} from "./Type";

export const onChangeForbidden = (params) => ({
    type: actionHistoryType.CHANGE_FORBIDDEN,
    params
})