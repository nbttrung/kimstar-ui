
import {DG_axios} from "../../custom/axios";


const baseURL = `/o/dogoo/socket`

export async function getWeighingStations(code) {

    const response = await DG_axios.get(baseURL + `/get-weighing-station/${code}`)
    return response?.data.result || []
}

export async function getAccountById(id) {
    const response = await DG_axios.get(baseURL + "/get-role/" + `${id}`)
    return response?.data.result || []
}
