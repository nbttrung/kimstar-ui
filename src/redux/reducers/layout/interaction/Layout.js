import {layoutInteractionType} from "../../../actions/layout/interaction/type";


const initialState = {
    headerTitle: null,
    collapsed: false,
    screenWidth: false,
    search: null,
    filterMenu: null,
    visibleDrawer: false,
    reloadData: false,
    object: {},
    isSettingSider: false,
    visibleDrawerAdmin: undefined,
};
const layoutInteractionReducer = (state = initialState, action) => {
    switch (action.type) {
        case layoutInteractionType.CHANGE_COLLAPSED_SIDER:
            return {
                ...state,
                collapsed: action.params == null ? !state.collapsed : action.params
            }
        case layoutInteractionType.CHANGE_SEARCH:
            return {
                ...state,
                search: action.params
            }
        case layoutInteractionType.SET_HEADER:
            return {
                ...state,
                headerTitle: action?.headerTitle ? action.headerTitle : null,
                filterMenu: action?.filerMenu ? action.filerMenu : null,
                reloadData: false,
                object: {}
            }
        case layoutInteractionType.ON_CHANGE_VISIBLE_DRAWER:
            return {
                ...state,
                visibleDrawer: action?.params ? action.params : !state.visibleDrawer
            }

        case layoutInteractionType.ON_RELOAD_DATA:
            return {
                ...state,
                reloadData: action.params
            }
        case layoutInteractionType.ON_CHANGE_SCREEN_WIDTH:
            return {
                ...state,
                screenWidth: action.screenWidth
            }
        case layoutInteractionType.CHANGE_SETTING_SIDER:
            return {
                ...state,
                isSettingSider: action.isSettingSider
            }
        case layoutInteractionType.ON_CHANGE_VISIBLE_DRAWER_ADMIN:
            return {
                ...state,
                visibleDrawerAdmin: action?.params
            }
        default:
            return state;
    }
};

export default layoutInteractionReducer;
