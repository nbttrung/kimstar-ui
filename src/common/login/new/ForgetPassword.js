import React from 'react';
import '../index.scss';
import {Col, Row} from "antd";
import doCan from "../../../asset/logo/doCan.png";
import ForgetPasswordInstance from "../ForgetPasswordInstance";

function ForgetPassword(props) {

    return (
        <div className={"h-screen"}>
            <Row className={"h-100"}>
                <Col span={14}>
                    <Row>
                        <Col span={24}>
                            <div
                                className={`mt-52 transition ease-in-out delay-150 font-bold text-center
                                flex items-center flex-col `}
                            >
                                <img
                                    src={doCan}
                                    alt="doCan"
                                    className={"rounded-[var(--secondary-radius)] w-[64px] h-[64px]"}
                                />
                                <h2 className={"mt-[26px] text-[var(--primary-text-color)] text-[18px] font-bold text-2xl mb-[46px]"}>
                                    doCan - Quản lý Trạm Cân
                                </h2>
                            </div>

                            <div className={"flex justify-center items-center md:mx-10 lg:mx-5 my-auto "}>
                                <ForgetPasswordInstance/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={10} className={"dg_background_img"} onClick={()=>window.location = "https://office.dogoo.vn/dang-ky"}/>
            </Row>
        </div>
    );
}

export default ForgetPassword;
