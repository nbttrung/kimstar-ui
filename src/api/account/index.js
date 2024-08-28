import {DG_axios} from "../../custom/axios";


const baseURL = `/o/dogoo/account`
export async function getAllAccounts(page, pageSize) {


    const response = await DG_axios.get(baseURL + "/get-list", {
            params: {
                page,
                pageSize,
            }
        }
    )
    return response?.data.result || []
}

export async function getAccountById(id) {
    const response = await DG_axios.get(baseURL + "/find-account/" + id)
    return response?.data.result || []
}
export async function updateAccount(id, data) {
    const response = await DG_axios.put(baseURL + "/update/" + id, data)
    return response?.data.result || []
}

export async function changePassword(id, data) {
    const response = await DG_axios.put(baseURL + "/change-password/" + id, data)
    return response?.data.result || []
}
export async function changeStatus(id, data) {
    const response = await DG_axios.put(baseURL + "/change-status/" + id, data)
    return response?.data.result || []
}
export async function changeRole(id, data) {
    const response = await DG_axios.put(baseURL + "/change-role/" + id, data)
    return response?.data.result || []
}
export async function addAccount(data) {
    const response = await DG_axios.post(baseURL + "/create" , data)
    return response?.data.result || []
}
export async function getScreenName(name) {
    const response = await DG_axios.get(baseURL + "/get-auto-code",{
        params : {
            name
        }
    } )
    return response?.data.result || []
}
export async function getCheckPermission(path, path2) {
    const response = await DG_axios.get(baseURL + "/get-check-permission",{
        params : {
            path,
            path2
        }
    } )

    return response?.data.result
}
export const checkScreenName = (screenName) => {
    return DG_axios.get(
        baseURL + "/check-screen-name",{
            params: {
                screenName
            }
        }
    );
};

export async function getCheckAdd(path, path2) {
    const response = await DG_axios.get(baseURL + "/get-check-add",{
        params : {
            path
        }
    } )

    return response?.data.result
}
