import {axiosType} from "./Type";

export const onChangeLoading = (params) => ({
    type: axiosType.ON_CHANGE_LOADING,
    params
})

export const onChangeSuccessAxios = (params) => ({
    type: axiosType.ON_CHANGE_SUCCESS_AXIOS,
    params
})


export const onChangeVisibleModalAxios = (params) => ({
    type: axiosType.ON_CHANGE_VISIBLE_MODAL_AXIOS,
    params
})
export const onChangeVisibleDrawerAxios = (params) => ({
    type: axiosType.ON_CHANGE_VISIBLE_DRAWER_AXIOS,
    params
})