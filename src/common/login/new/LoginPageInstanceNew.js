import React, {useEffect, useState} from 'react';
import '../index.scss';
import LoginFormInstance from "../LoginFormInstance";
import {Col, Row} from "antd";
import doCan from "../../../asset/logo/doCanNew.svg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../../redux/actions/layout/interaction/action";
import {getMeLogin} from "../../../api/system/admin/user-account";
import {getWeighingStations} from "../../../api/socket";
import {getAccountById} from "../../../api/account";

function LoginPageInstanceNew(props) {

    const navigate = useNavigate()
    const {loggedInSuccess, loadingLogin} = useSelector(
        (state) => state.loginReducer
    );
    const dispatch = useDispatch()
    const me = getMeLogin();

    const height = window.innerHeight;
    const [width, setWidth] = useState(window.innerWidth);

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

    useEffect(() => {
        dispatch(setHeader("Home - Dogoo"))
    }, [dispatch])

    const navigateAdminUser = () => {
        getAccountById(me?.accountId).then(r => {
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
        })
    }

    useEffect(() => {

        if (loggedInSuccess && me?.role === "admin") {
            navigate("/")
        }
        if (loggedInSuccess && me?.role !== "admin") {
            // navigate("/can/overview-weighing-station")
            navigateAdminUser()
        }

    }, [loggedInSuccess, loadingLogin, me, navigate]);

    return (
        <div style={{height: height}}>
            <Row style={{height: height}}>
                <Col span={isMobile ? 24 : 14}>
                    <Row style={{height: height}} className={"flex items-center"}>
                        <Col span={24}>
                            <div
                                className={`transition ease-in-out delay-150 font-bold text-center
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
                                <LoginFormInstance/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                {
                    !isMobile && <Col span={10} className={"dg_background_img"}
                                      onClick={() => window.location = "https://office.dogoo.vn/dang-ky"}/>
                }
            </Row>
        </div>
    );
}

export default LoginPageInstanceNew;
