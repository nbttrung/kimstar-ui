import React, {useEffect, useState} from 'react';
import LayoutSidebar from "./sidebar";
import {ConfigProvider, Layout} from "antd";
import LayoutHeader from "./header";
import LayoutContent from "./content";
import {useNavigate} from "react-router-dom";
import vi_VN from 'antd/es/locale/vi_VN';
import en_US from 'antd/es/locale/en_US';
import {getMe} from "../api/system/admin/user-account";
import {useDispatch, useSelector} from "react-redux";
import {loadAccountActions, loadWeightSlipActions} from "../redux/actions/permission/action";
import HeaderResponsive from "../responsive-components/Header";
import SiderResponsive from "../responsive-components/Sider";
import {getAccountById} from "../api/account";
import {getWeighingStations} from "../api/socket";

function MainLayout(props) {

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [theme, setTheme] = useState({})
    const me = getMe();
    const {account, weighingStation} = useSelector(state => state.permissionAccountActionReducer)
    const path2 = window.location.pathname.split("/")[2]

    const [width, setWidth] = useState(window.innerWidth);
    const [collapsed, setCollapsed] = useState(false)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    const themeDefault = localStorage.getItem("theme")

    useEffect(() => {
        setTheme(JSON.parse(localStorage.getItem("theme")))
    }, [themeDefault])

    const path = window.location.pathname

    useEffect(() => {
        if (path === "/") {
            getAccountById(me?.accountId).then(r => {
                if (r.role === "admin"){
                    navigate("/can/weighing-station")
                }else{
                    getWeighingStations(me?.key).then(res => {
                        let array = r?.roleList?.filter(item => item.module === "account")
                        if (r.roleAll) {
                            if (res.length > 0){
                                navigate("/can/report-weighing-station/" + res[0].weighingStationCode)
                            }else{
                                if (array?.length > 0 && array[0].roleView) {
                                    navigate("/can/account")
                                } else {
                                    navigate("/can/report")
                                }
                            }
                        } else {
                            if (res.length > 0){
                                let array1 = r?.roleList?.filter(item => item.module === res[0].weighingStationCode)
                                if (array1?.length > 0 && array1[0].roleView) {
                                    navigate("/can/report-weighing-station/" + res[0].weighingStationCode)
                                } else {
                                    navigate("/can/report")
                                }
                            }else{
                                if (array?.length > 0 && array[0].roleView) {
                                    navigate("/can/account")
                                } else {
                                    navigate("/can/report")
                                }
                            }
                        }
                    })
                }
            })
        }

    }, [path, account, weighingStation, me?.accountId, me?.key, navigate])

    useEffect(() => {

        dispatch(loadAccountActions(me?.accountId));
        if (me?.key)
            dispatch(loadWeightSlipActions(me?.key));
    }, [me?.accountId, me?.key, dispatch])

    return (
        <ConfigProvider
            theme={{
                token: {
                    ...theme,
                    fontSize: 14,
                    wireframe: false,
                    colorPrimary: "#007FFF",
                    colorPrimaryText: "#344054",
                }
            }}
            locale={localStorage.getItem("language") === "en" ? en_US : vi_VN}
        >
            <Layout style={{
                height: "100vh",
                width: "100vw",
                maxHeight: "100vh",
                maxWidth: "100vw",
                overflow: "hidden"
            }}>
                {
                    !isMobile && <LayoutSidebar/>
                }
                {
                    isMobile && <SiderResponsive showSiderMobile={collapsed}
                                                 closeSiderMobile={() => setCollapsed(false)}
                                                 isMobile={isMobile}/>
                }
                <Layout>
                    {
                        path2 !== "report-weighing-station" && !isMobile && <LayoutHeader/>
                    }
                    {
                        isMobile && <HeaderResponsive showSiderMobileFn={() => setCollapsed(true)}/>
                    }
                    <LayoutContent isMobile={isMobile}/>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default MainLayout;
