import React, {useEffect} from 'react';
import {Button, Col} from "antd";
import {useDrawerContext} from "../../index";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {onReloadData} from "../../../../../redux/actions/layout/interaction/action";

const Footer_Submit = props => {

    const {t} = useTranslation();

    const {mode, form, success, onChangeSuccess} = useDrawerContext()

    const dispatch = useDispatch()


    useEffect(() => {
        if (success) {
            if (mode === "add") {
                form.resetFields()
            }
            dispatch(onReloadData(true))
            onChangeSuccess(false)
        }

    }, [success])


    const handleOnSubmit = () => {
        form.submit()
    }

    return (

        <Col>
            <Button
                {...props}
                onClick={handleOnSubmit}
                htmlType="submit"
                type="primary">
                {t(`common.${mode}`)}
            </Button>
        </Col>
    );
};

Footer_Submit.propTypes = {};

export default Footer_Submit;
