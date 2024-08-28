import {permissionAccountType} from "../../actions/permission/type";

const initialState = {
    account: {},
    weighingStation: []
}
const permissionAccountActionReducer = (state = initialState, action) => {
    switch (action.type) {
        case permissionAccountType.LOAD_ACCOUNT_START :
        case permissionAccountType.LOAD_WEIGHT_SLIP_START :
            return {
                ...state,
                params : action.params,
            }
        case permissionAccountType.SET_ACCOUNT_SUCCESS:
            return {
                ...state,
                account : action.params,
            }
        case permissionAccountType.SET_ACCOUNT_ERROR:
        case permissionAccountType.SET_WEIGHT_SLIP_ERROR:
            return {
                ...state,
                error: action.params,
            }
        case permissionAccountType.SET_WEIGHT_SLIP_SUCCESS:
            return {
                ...state,
                weighingStation : action.params,
            }
        default:
            return state;
    }
}

export default permissionAccountActionReducer;
