import React, {createContext, useContext, useState} from 'react';
import {Button, Modal} from "antd";
import {useTranslation} from "react-i18next";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

export const ModalContext = createContext({})

export const useModalContext = () => useContext(ModalContext)

const DG_Modal = props => {

    const {t} = useTranslation();


    const [mode, setMode] = useState(props?.mode)
    const [form, setForm] = useState()
    const {headerTitle} = useSelector(state => state.layoutInteractionReducer)


    const handleOnOk = (value) => {
        form?.submit()
        if (props.onOk) props.onOk(value)
    }

    const handleOnCancel = () => {

        if (mode === "add") {
            form?.resetFields()
        }
        props.onCancel()

    }
    const handleOnBack = () => {

        props.onBack()

    }
    const getTitle = () => {
        if (props.title)
            return props.title
        else {
            if (mode === "add")
                return t("common.add") + " " + headerTitle?.toLowerCase()
            if (mode === "update")
                return t("common.update") + " " + headerTitle?.toLowerCase()
        }
    }
    return (
        <Modal
            title={getTitle()}
            visible={props.visible}
            {...props}
            // okText={props.okText}
            // cancelText={"Hủy"}
            // onOk={handleOnOk}
            // onCancel={handleOnCancel}
            destroyOnClose={true}
            okButtonProps={{ disabled: props.disabled, }}
            footer={[
                <Button key="back" onClick={props.back ? handleOnBack : handleOnCancel} >
                    {props.okBack ? props.okBack : "Hủy"}
                </Button>,
                <Button key="submit" type="primary" loading={props.loading} onClick={handleOnOk} style={{color: "white"}}>
                    {props.okText}
                </Button>,
            ]}
            className="modalStyle"
        >
            <ModalContext.Provider value={{setMode, setForm}}>

                {props.children}
            </ModalContext.Provider>

        </Modal>
    );
};

DG_Modal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    mode: PropTypes.string
};

export default DG_Modal;
