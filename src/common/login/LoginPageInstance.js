import React, {useEffect} from 'react';
import LoginFormInstance from "./LoginFormInstance";
import './index.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../redux/actions/layout/interaction/action";
import {Spin} from "antd";

function LoginPageInstance(props) {
    const navigate = useNavigate()
    const {loggedInSuccess, loadingLogin} = useSelector(
        (state) => state.loginReducer
    );
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setHeader("Home - Dogoo"), null)
    }, [])

    useEffect(() => {
        if (loggedInSuccess) {
            navigate("/")
        }

    }, [loggedInSuccess, loadingLogin]);

    return (
        <Spin spinning={loadingLogin}>
            <div className={"login-page h-screen"}>
                <div className={"flex justify-center items-center md:mx-10 lg:mx-5 my-auto h-full"}>
                    <LoginFormInstance/>
                </div>
            </div>
        </Spin>
    );
}

export default LoginPageInstance;
