import {layoutInteractionType} from "./type";

export const changeCollapsedSider = (collapsed) => ({
    type: layoutInteractionType.CHANGE_COLLAPSED_SIDER,
    params: collapsed
})

export const changeSearch = (search) => ({
    type: layoutInteractionType.CHANGE_SEARCH,
    params: search
})

export const setHeader = (headerTitle, filerMenu) => ({
    type: layoutInteractionType.SET_HEADER,
    headerTitle: headerTitle,
    filerMenu: filerMenu
})

export const onChangeVisibleDrawer = (mode) => ({
    type: layoutInteractionType.ON_CHANGE_VISIBLE_DRAWER,
    params: mode
})

export const onReloadData = (params) => ({
    type: layoutInteractionType.ON_RELOAD_DATA,
    params
})

export const onChangeScreenWidth = (screenWidth) => ({
    type: layoutInteractionType.ON_CHANGE_SCREEN_WIDTH,
    screenWidth
})

export const changeSettingSider = (isSettingSider) => ({
    type: layoutInteractionType.CHANGE_SETTING_SIDER,
    isSettingSider
})

export const onChangeVisibleDrawerAdmin = (params) => ({
    type: layoutInteractionType.ON_CHANGE_VISIBLE_DRAWER_ADMIN,
    params
})
