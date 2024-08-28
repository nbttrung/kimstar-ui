import React from 'react';
import {LogoutOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Col, Dropdown, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logoutStart} from "../redux/actions/login/actions";

const styleItem = {
    borderRadius: 3,
    color: "#1f1f1f",
    cursor: "pointer",
    display: "flex",
}

function HeaderResponsive({showSiderMobileFn}) {

    const dispatch = useDispatch()
    const {headerTitle} = useSelector(state => state.layoutInteractionReducer)
    const handleOnLogout = () => {
        dispatch(logoutStart())
    }

    const items = [
        {
            label: <div style={styleItem} className={"h-12 items-center"}>
                <LogoutOutlined className={"mr-2"}/> Đăng xuất </div>,
            key: 'logout',
            onClick: handleOnLogout
        },
    ];

    return (
        <div className={"py-2"} id={"header-mobile"} style={{borderBottom: "1px solid #D0D5DD"}}>

            <Row gutter={12}>
                <Col span={1}/>
                <Col span={3} className={"flex"}>
                    <MenuOutlined className={"cursor-pointer text-2xl"} onClick={showSiderMobileFn}/>
                </Col>
                <Col span={16} className={"flex items-center"}>
                    <span style={{
                        fontSize: 20,
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: "bold"
                    }}
                    >
                        {headerTitle}
                    </span>
                </Col>


                <Col span={3}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        className={"cursor-pointer"}
                        openClassName={"custom-dropdown"}
                    >
                        <Avatar
                            size={40}
                            icon={<UserOutlined/>}
                        />
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderResponsive;
