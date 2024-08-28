import ExamplePdf from '../../asset/rar/Quan ly tram can.zip';
import React from 'react';
import {Button, Layout} from "antd";
import HeaderAccount from "./components/account";
import HeaderSearch from "./components/search";
import {DownloadOutlined} from "@ant-design/icons";
import {arrayPathAdmin} from "../../components/can/check/checkEdit";
const {Header} = Layout

function LayoutHeader(props) {

    const path = window.location.pathname.split("/")[2]

    return (
        <Header
            style={{
                height: "var(--header-height)",
                background: "var(--primary-bg)",
                padding: "0 24px",
                lineHeight: "var(--primary-line-height)",
            }}
            className={"flex items-center justify-between"}
        >
            <div/>
            <div className="flex items-center">
                <HeaderSearch/>
                {
                    arrayPathAdmin.includes(path) && <div className="mr-[24px]">
                        <a
                            href={ExamplePdf}
                            download="Quan ly tram can"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button icon={<DownloadOutlined/>}
                                    style={{ height: 44 }} >
                                Tải Agent
                            </Button>
                        </a>

                    </div>
                }
                <div>
                    <HeaderAccount/>
                </div>
            </div>
        </Header>
    );
}

export default LayoutHeader;
