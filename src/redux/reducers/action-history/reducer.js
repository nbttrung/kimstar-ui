import {actionHistoryType} from "../../actions/action-history/Type";

const initialState = {
    forbidden: false
}

const actionHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionHistoryType.CHANGE_FORBIDDEN:
            return {
                ...state,
                forbidden: action.params
            }
        default:
            return state;
    }
}
export default actionHistoryReducer;
