import React from 'react';
import {Button, Col} from "antd";
import {useDrawerContext} from "../../index";
import {useTranslation} from "react-i18next";

const Footer_Cancel = props => {

    const {t} = useTranslation();
    const {mode, form, onClose} = useDrawerContext()

    const handleOnCancel = () => {
        onClose()
        if (mode === "add") {
            form.resetFields()
        }
    }


    return (
        <Col>
            <Button onClick={handleOnCancel} key="test">
                {t("common.back")}
            </Button>
        </Col>
    );
};

Footer_Cancel.propTypes = {};

export default Footer_Cancel;
