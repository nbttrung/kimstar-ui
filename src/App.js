import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {onChangeScreenWidth} from "./redux/actions/layout/interaction/action";
import LoginPageInstanceNew from "./common/login/new/LoginPageInstanceNew";
import useNetwork from "./custom/network";
import {BsWifi, BsWifiOff} from "react-icons/bs";
import {RiCloseCircleLine} from "react-icons/ri";
import {notification} from "antd";
import NotFound from "./custom/notFound/notFound";
import ForgetPassword from "./common/login/new/ForgetPassword";
import Chou from "./components/chou/Chou";

function App() {
    const dispatch = useDispatch()
    const online = useNetwork();

    useEffect(() => {
        if (online !== undefined) {
            notification.open({
                key: "updateNetwork",
                icon: online ? <BsWifi/> : <BsWifiOff/>,
                message: online ? "Đã khôi phục kết nối Internet." : "Bạn đang offline.",
                placement: "bottomLeft",
                duration: online ? 5 : 0,
                closeIcon: <RiCloseCircleLine fontSize={22}/>,
                style: {
                    borderRadius: 8,
                    width: 'auto'
                }
            })
        }

    }, [online]);

    const width = window.innerWidth

    useEffect(() => {
        if (width <= 1300) dispatch(onChangeScreenWidth(true));
        else dispatch(onChangeScreenWidth(false));
    }, [width, dispatch])

    const isMobile = width <= 768;

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPageInstanceNew/>}/>
                    <Route path="/forget-password" element={<ForgetPassword/>}/>
                    <Route path="/" element={!isMobile ? <> Quán chưa hỗ trợ đặt hàng trên web laptop/máy tính </> : <Chou/>}/>

                    {/*<Route path="/*" element={<MainLayout/>}>
                        <Route path={"can/*"} element={<CanRouter/>}/>
                    </Route>*/}
                    <Route path="/:somestring" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>

    );

}


export default App;
