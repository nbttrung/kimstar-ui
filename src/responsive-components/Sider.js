import React from 'react';
import {Drawer} from "antd";
import doCan from "../asset/logo/doCan.png";
import SidebarMenu from "../layout/sidebar/components/Menu";

function SiderResponsive({showSiderMobile, closeSiderMobile, isMobile}) {
    return (
        <Drawer
            placement={"left"}
            closable={false}
            onClose={closeSiderMobile}
            open={showSiderMobile}
            width={300}
            bodyStyle={{
                padding: 0,
                overflow: "hidden",
                backgroundColor: "#F5F5F5",
            }}
        >
            <div className={"sidebar__info flex p-3 pl-5"}
                 style={{
                     borderBottom: "0.5px solid #dadce0",
                     alignItems: "end",
                     height: 57
                 }}
            >
                <img
                    src={doCan}
                    alt="doCan"
                    className={"rounded-[var(--secondary-radius)] w-[30px] h-[30px]"}
                />
                <h2 className={"pl-4 text-[var(--primary-text-color)] text-[18px]"}>
                    doCan
                </h2>
            </div>
            <div>
                <SidebarMenu isMobile={isMobile} onClose={closeSiderMobile}/>
            </div>
        </Drawer>
    );
}

export default SiderResponsive;
