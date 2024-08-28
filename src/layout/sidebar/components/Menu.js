import React, {useEffect, useState} from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {checkViewAccount, checkViewWeighingStation} from "../../../components/can/check/checkEdit";
import can from "../../../asset/icon/canSvg.svg";
import canMau from "../../../asset/icon/canMau.svg";
import accountImg from "../../../asset/icon/accountSvg.svg";
import accountImgMau from "../../../asset/icon/accountMau.svg";
import reportImg from "../../../asset/icon/tongQuan.svg";
import reportImgMau from "../../../asset/icon/tongQuanMau.svg";
import {getAccountById} from "../../../api/account";
import {getWeighingStations} from "../../../api/socket";
import {getMe} from "../../../api/system/admin/user-account";

function getItem(label, key, icon, children, type, className) {
    return {
        key,
        icon,
        children,
        label,
        type,
        className
    };
}

function SidebarMenu({isMobile, onClose}) {
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState("overview-seller")
    const path = window.location.pathname
    const {account, weighingStation} = useSelector(state => state.permissionAccountActionReducer)
    const me = getMe();
    const [checkMenu, setCheckMenu ] = useState(true)

    useEffect(() => {
        const paths = path.split("/")
        if (paths.length === 4) {
            setSelectedKey(decodeURI(paths[3]))
        } else {
            setSelectedKey(decodeURI(paths[2]))
        }
    }, [path, account])

    const items = [
        // getItem('Tổng quản', 'overview-seller',
        //     <LayoutOutlined />,
        //     null
        // ),
        getItem('Trạm cân', 'weighing-station',
            path.split("/")[2] === 'weighing-station' ?
                <img src={canMau}
                     className={"cursor-pointer"}
                     alt={canMau} style={{width: 20, height: 20}}/> :
                <img src={can}
                     className={"cursor-pointer"}
                     alt={can} style={{width: 20, height: 20}}/>,
            null
        ),
        getItem('Khách hàng', 'customer',
            path.split("/")[2] === 'customer' ?
                <img src={accountImgMau}
                     className={"cursor-pointer"}
                     alt={accountImgMau} style={{width: 20, height: 20}}/> :
                <img src={accountImg}
                     className={"cursor-pointer"}
                     alt={accountImg} style={{width: 20, height: 20}}/>,
            null
        ),
        // getItem('Hoa hồng', 'business-commissions',
        //     <PayCircleOutlined />,
        //     null
        // ),
        // getItem('Tải xuống', 'download',
        //     <DownloadOutlined />,
        //     null
        // ),
    ];

    useEffect(()=>{
        if (me?.key){
            getAccountById(me?.accountId).then(r => {
                getWeighingStations(me?.key).then(res => {
                    if (r.roleAll && res.length > 0) {
                        setCheckMenu(true)
                    } else {
                        let array = res.map(item=>item.weighingStationCode)
                        let array2 = r.roleList.filter(item=>array.includes(item.module) && item.roleView)
                        setCheckMenu(array2.length > 0)
                    }
                })
            })
        }
    },[me?.accountId, me?.key])
    const getSubMenuWeighingStation = () => {
        return weighingStation?.map((item) => {
            if (checkViewWeighingStation(account, item.weighingStationCode)) {
                return getItem(item.weighingStationName, item.weighingStationCode, null, null, "number")
            }
            return []
        })
    }

    const itemBuys = [
        // getItem('Tổng quan', 'overview-weighing-station',
        //     <LayoutOutlined />,
        //     null
        // ),
        checkMenu && getItem('Trạm cân', "weighing-station",
            path.split("/")[2] === 'report-weighing-station' ?
                <img src={canMau}
                     className={"cursor-pointer"}
                     alt={can} style={{width: 20, height: 20}}/> :
                <img src={can}
                     className={"cursor-pointer"}
                     alt={can} style={{width: 20, height: 20}}/>,
            getSubMenuWeighingStation(),
        ),
        !isMobile && getItem('Báo cáo', 'report',
            path.split("/")[2] === 'report' ?
                <img src={reportImgMau}
                     className={"cursor-pointer"}
                     alt={reportImg} style={{width: 20, height: 20}}/> :
                <img src={reportImg}
                     className={"cursor-pointer"}
                     alt={reportImg} style={{width: 20, height: 20}}/>,
            null
        ),
        checkViewAccount(account) && getItem('Tài khoản', 'account',
            path.split("/")[2] === 'account' ?
                <img src={accountImgMau}
                     className={"cursor-pointer"}
                     alt={accountImg} style={{width: 20, height: 20}}/> :
                <img src={accountImg}
                     className={"cursor-pointer"}
                     alt={accountImg} style={{width: 20, height: 20}}/>,
            null
        ),
        // getItem('Gói thuê bao', 'subscription-package',
        //     <CreditCardOutlined />,
        //     null
        // ),
    ];

    const onClick = ({key, keyPath}) => {
        if (key != null && keyPath.length === 1)
            navigate(`can/${key}`)

        if (key != null && keyPath.length === 2)
            navigate(`can/report-weighing-station/${key}`)

        setSelectedKey(key)
        if (onClose)
            onClose()
    };

    const getItem1 = () => {
        if (account) {
            if (account.role === "admin") {
                return items;
            }

            return itemBuys
        }
    }

    return (
        <Menu
            onClick={onClick}
            style={{
                background: "var(--primary-bg)",
                border: "none",
                fontSize: "var(--primary-text)",
                lineHeight: "var(--primary-line-height)",
                color: "var(--primary-text-color)"
            }}
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['weighing-station']}
            mode="inline"
            items={getItem1()}
            className={"menu-dropdown-account"}
        />
    );
}

export default SidebarMenu;
