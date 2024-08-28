import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Account from "./account";
import NotFound from "../../custom/notFound/notFound";
import AccountMobile from "../canMobile/account";

const CanRouter = () => {

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

    return (
        <Routes path={"/"}>
            <Route path="account" element={!isMobile ? <Account/> : <AccountMobile/>}/>
            <Route path="/:somestring" element={<NotFound/>}/>
        </Routes>
    );
};

CanRouter.propTypes = {};

export default CanRouter;
