import React, {useState} from 'react';
import {Avatar, Dropdown} from "antd";
import ChangePassword from "../../../../common/layout/header/account/service/ChangePassword";
import {BookOutlined, KeyOutlined, LockOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {getMe} from "../../../../api/system/admin/user-account";
import {useDispatch} from "react-redux";
import {logoutStart} from "../../../../redux/actions/login/actions";

const styleItem = {
    borderRadius: 3,
    color: "#1f1f1f",
    cursor: "pointer",
    display: "flex",
}
function HeaderAccount(props) {

    const dispatch = useDispatch();

    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const me = getMe();
    const handleOnLogout = () => {
        dispatch(logoutStart())
    }

    const items = [
        {
            label: <div className={"text-center pt-2 pb-1 px-3"}>
                <Avatar
                    size={40}
                    {...props}
                    icon={<UserOutlined />}
                />
                <h2 className={"text-[16px] font-[600] leading-[20px] mb-[2px] mt-1"}>{me?.name}</h2>
            </div>,
            key: '/avatar',
            className: "custom-menu-item",
        },
        {
            type: 'divider',
        },
        // {
        //     label: <div style={styleItem}> <MailOutlined className={"mr-2"} /> Đổi email </div> ,
        //     key: 'email',
        //     style: {
        //         padding: "5px 12px",
        //         margin: "7px 0"
        //     },
        //     onClick: () => {
        //         setChangeEmailModal(true)
        //     }
        // },
        {
            label: <div style={styleItem} className={"h-12 items-center"}> <KeyOutlined className={"mr-2"}/> Đổi mật khẩu </div>,
            key: 'password',
            onClick: (value) => {
                setChangePasswordModal(true)
            }
        },
        {
            type: 'divider',
        },
        {
            label: <div style={styleItem} className={"h-12 items-center"}> <LockOutlined className={"mr-2"} /> Điều khoản sử dụng </div>,
            key: 'term-services',
        },
        {
            label: <div style={styleItem} className={"h-12 items-center"}> <BookOutlined className={"mr-2"}/> Tài liệu sử dụng </div>,
            key: 'document',
            onClick: () => {
                window.open("https://www.youtube.com/@dogoojsc/videos")
            },
        },
        {
            type: 'divider',
        },
        {
            label: <div style={styleItem} className={"h-12 items-center"} > <LogoutOutlined className={"mr-2"} /> Đăng xuất </div> ,
            key: 'logout',
            onClick: handleOnLogout
        },
    ];

    return (
        <>
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
                    {...props}
                    icon={<UserOutlined />}
                />
            </Dropdown>

            <ChangePassword
                onCancel={() => {
                    setChangePasswordModal(false)
                }}
                visible={changePasswordModal}
            />
            {/*<ChangeEmail*/}
            {/*    onCancel={() => {*/}
            {/*        setChangeEmailModal(false)*/}
            {/*    }}*/}
            {/*    visible={changeEmailModal}*/}
            {/*/>*/}
        </>
    );
}

export default HeaderAccount;
