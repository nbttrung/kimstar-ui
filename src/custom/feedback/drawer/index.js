import React, {createContext, useContext, useState} from 'react';
import {Drawer} from "antd";
import PropTypes from 'prop-types';
import Drawer_Footer from "./footer";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";


export const DrawerContext = createContext({})

export const useDrawerContext = () => useContext(DrawerContext)


const DG_Drawer = props => {
    const {t} = useTranslation()
    const [mode, setMode] = useState()
    const [form, setForm] = useState()
    const {headerTitle} = useSelector(state => state.layoutInteractionReducer)

    const onClose = (value) => {
        if (mode === "add") {
            form?.resetFields()
        }
        props.onClose(value);
    }

    const getTitle = () => {
        if (props.title)
            return props.title
        else {
            if (mode === "add")
                return t("common.add") + " " + headerTitle.toLowerCase()
            if (mode === "update")
                return t("common.update") + " " + headerTitle.toLowerCase()
        }
    }


    return (
        <>
            <Drawer
                placement="right"
                title={getTitle()}
                {...props}
                destroyOnClose={true}
                afterVisibleChange={(value) => {
                    if (!value && mode === "add") form?.resetFields()
                }}
                visible={props.visible}
                // onClose={onClose}
                footer={[
                    <DrawerContext.Provider
                        value={{
                            mode, form, onClose
                        }}>
                        <Drawer_Footer/>
                    </DrawerContext.Provider>

                ]}
            >
                <DrawerContext.Provider value={{setMode, setForm}}>
                    {props.children}
                </DrawerContext.Provider>
            </Drawer>
        </>
    );
};

DG_Drawer.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DG_Drawer;