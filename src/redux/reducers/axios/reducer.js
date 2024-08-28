import {axiosType} from "../../actions/axios/Type";

const initialState = {
    loading: false,
    successAxios: false,
    visibleModalAxios: false,
    visibleDrawerAxios: false,
    successForm: false,
    successModal: false,
    successDrawer: false
}

const axiosReducer = (state = initialState, action) => {
    switch (action.type) {
        case axiosType.ON_CHANGE_LOADING:
            return {
                ...state,
                loading: action.params
            }
        case axiosType.ON_CHANGE_VISIBLE_MODAL_AXIOS:
            return {
                ...state,
                visibleModalAxios: action.params
            }
        case axiosType.ON_CHANGE_VISIBLE_DRAWER_AXIOS:
            return {
                ...state,
                visibleDrawerAxios: action.params
            }
        case axiosType.ON_CHANGE_SUCCESS_AXIOS:
            return {
                ...state,
                successAxios: action.params,
                successModal: action.params && state.visibleModalAxios,
                successDrawer: action.params && state.visibleDrawerAxios,
                successForm: action.params && !state.visibleDrawerAxios && !state.visibleModalAxios
            }
        default:
            return state
    }
}

export default axiosReducer;
