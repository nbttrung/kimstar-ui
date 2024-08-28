import React, {useEffect, useState} from 'react';
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Error403 from "../../common/error/Error403";
import {getCheckPermission} from "../../api/account";

const {Content} = Layout

function LayoutContent({isMobile}) {

    const path = window.location.pathname
    const [forbidden, setForbidden] = useState(true)
    const path2 = path.split("/")[2]
    const path3 = path.split("/")[3]

    useEffect(()=>{
        if (path === "/"){
            setForbidden(true)
        }else{
            getCheckPermission(path2 == null ? "overview-seller" : path2, path3).then(r => {
                setForbidden(r)
            })
                .catch(()=>{})
        }
    },[path, path2, path3])

    return (
        <Content
            style={{
                margin: 0,
                padding: path2 !== "report-weighing-station" ?
                    '15px 24px 15px 0' : '0px' ,
                overflow: isMobile ? "hidden" : "auto"
            }}
            className={isMobile ? "content_mobile" : ""}
        >
            {forbidden
                ? <Outlet/> : <Error403/>}

        </Content>
    );
}

export default LayoutContent;
