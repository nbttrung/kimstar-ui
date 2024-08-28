import {permissionAccountType} from "./type"
export const loadAccountActions = (params) => ({
    type: permissionAccountType.LOAD_ACCOUNT_START,
    params
})

export const setAccountSuccess = (params) => ({
    type: permissionAccountType.SET_ACCOUNT_SUCCESS,
    params
})

export const setAccountError = (params) => ({
    type: permissionAccountType.SET_ACCOUNT_ERROR,
    params
})
export const loadWeightSlipActions = (params) => ({
    type: permissionAccountType.LOAD_WEIGHT_SLIP_START,
    params
})

export const setWeightSLipSuccess = (params) => ({
    type: permissionAccountType.SET_WEIGHT_SLIP_SUCCESS,
    params
})

export const setWeightSlipError = (params) => ({
    type: permissionAccountType.SET_WEIGHT_SLIP_ERROR,
    params
})
