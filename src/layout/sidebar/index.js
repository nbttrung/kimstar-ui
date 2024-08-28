import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Layout, Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import SidebarMenu from "./components/Menu";
import {useDispatch, useSelector} from "react-redux";
import {
    changeCollapsedSider,
    changeSettingSider,
    onChangeVisibleDrawer,
    onChangeVisibleDrawerAdmin
} from "../../redux/actions/layout/interaction/action";
import {ReactComponent as PlusIcon} from "../../asset/icon/plus.svg";
import doCan from "../../asset/logo/doCanNew.svg";
import {arrayPathAdmin} from "../../components/can/check/checkEdit";
import {getCheckAdd} from "../../api/account";

const {Sider} = Layout

const styleVisibilityHidden = {
    visibility: "hidden",
    border: "none",
    backgroundColor: "#F5F5F5",
    height: 40
}
const styleVisibilityVisible = {
    visibility: "visible"
}

function LayoutSidebar(props) {

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()
    const path = window.location.pathname
    const [check, setCheck] = useState(false)
    const {account} = useSelector(state => state.permissionAccountActionReducer)

    useEffect(()=>{
        dispatch(changeCollapsedSider(collapsed))
    },[collapsed, dispatch])

    useEffect(() => {
        const paths = path.split("/")

        if (paths[2])
            getCheckAdd(paths[2]).then(r => {
                setCheck(r?.checkAdd)
            })
                .catch(()=>{})

    }, [path, account])
    const handleClick = () => {
        dispatch(onChangeVisibleDrawer(true))
    }

    const content = (
        <div style={{boxShadow: "-5px 10px 25px rgb(212, 211, 211)"}}>
            <Menu
                onClick={(e)=>dispatch(onChangeVisibleDrawerAdmin(e.key))}
                mode="vertical"
                items={[
                    {
                        label: "Thêm trạm cân",
                        key: 'weightStation',
                    },
                    {
                        label: "Thêm khách hàng",
                        key: 'customers',
                    },
                ]}
                className={"customer_menu"}
            />
        </div>
    );

    const RenderButtonAdd = () =>{
        if (arrayPathAdmin.includes(path.split("/")[2])){
            return <Dropdown
                overlay={content}
                placement="bottomLeft"
                trigger={['click']}
            >
                <Button
                    type={"primary"}
                    icon={<PlusIcon
                        fill={"#FFFFFF"}
                        width={20}
                    />}
                    shape={!collapsed ? "default" : "circle"}
                    // onClick={handleClick}
                    className={"custom-btn flex items-center justify-center rounded-[var(--primary-radius)]"}
                    style={check ? styleVisibilityVisible : styleVisibilityHidden}
                >
                    {!collapsed ? <p className={"ml-[3px] mr-[3px] font-[600] leading-[20px]"} style={{color: "white"}}>
                        {"Tạo mới"}
                    </p> : ""}
                </Button>

            </Dropdown>
        }
        if (path.split("/")[2] === "account"){
            return <Button
                type={"primary"}
                icon={<PlusIcon
                    fill={"#FFFFFF"}
                    width={20}
                />}
                shape={!collapsed ? "default" : "circle"}
                onClick={handleClick}
                className={"custom-btn flex items-center justify-center rounded-[var(--primary-radius)]"}
                style={check ? styleVisibilityVisible : styleVisibilityHidden}
            >
                {!collapsed ? <p className={"ml-[3px] mr-[3px] font-[600] leading-[20px]"} style={{color: "white"}}>
                    {"Tạo tài khoản"}
                </p> : ""}
            </Button>
        }

        if (path.split("/")[2] === "report-weighing-station"){
            return <Button
                type={"primary"}
                icon={<PlusIcon
                    fill={"#FFFFFF"}
                    width={20}
                />}
                shape={!collapsed ? "default" : "circle"}
                onClick={handleClick}
                className={"custom-btn flex items-center justify-center rounded-[var(--primary-radius)]"}
                style={check ? styleVisibilityVisible : styleVisibilityHidden}
            >
                {!collapsed ? <p className={"ml-[3px] mr-[3px] font-[600] leading-[20px]"} style={{color: "white"}}>
                    {"Tạo phiếu"}
                </p> : ""}
            </Button>
        }

        return <Button
            type={"link"}
            className={"flex items-center justify-center rounded-[var(--primary-radius)]"}
            style={check ? styleVisibilityVisible : styleVisibilityHidden}
        >

        </Button>
    }

    return (
        <Sider
            width={280}
            collapsible
            trigger={null}
            collapsed={collapsed}
            style={{
                background: "var(--primary-bg)",
                fontSize: "var(--primary-text)"
            }}
        >
            <div
                className={`sidebar__heading flex  ${collapsed ? "justify-center" : ""} px-[12px]`}
                style={{height: "var(--header-height)"}}
            >
                <MenuOutlined
                    className={"text-[22px] font-bold text-[var(--primary-text-color)] "}
                    onClick={() => {
                        setCollapsed(prev => !prev)
                    }}
                />
                {!collapsed &&
                    <div
                        className={`sidebar__logo flex items-center px-[15px]  transition ease-in-out delay-150`}
                        onClick={() => {
                            dispatch(changeSettingSider(false))
                        }}
                    >
                        <img
                            src={doCan}
                            alt="doCan"
                            className={"rounded-[var(--secondary-radius)] w-[30px] h-[30px]"}
                        />
                        <h2 className={"px-[10px] text-[var(--primary-text-color)] text-[18px]"}>
                            doCan
                        </h2>
                    </div>}
            </div>

            <div className={"w-full flex items-center justify-center py-[16px]"}>
                {
                    RenderButtonAdd()
                }
            </div>

            <div style={{marginLeft: "-9px"}}>
                <SidebarMenu collapsed={collapsed}/>
            </div>
        </Sider>
    );
}

export default LayoutSidebar;
