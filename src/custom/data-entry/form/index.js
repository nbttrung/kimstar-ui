import React, {createContext, useContext, useEffect, useState} from 'react';
import {Form} from "antd";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {onChangeSuccessAxios} from "../../../redux/actions/axios/Action";
import {useDrawerContext} from "../../feedback/drawer";
import {useModalContext} from "../../feedback/modal";
import {onChangeForbidden} from "../../../redux/actions/action-history/Action";


export const DG_FormContext = createContext({})

export const useDG_FormContext = () => useContext(DG_FormContext)

const DG_Form = props => {

    const {t} = useTranslation()
    const {successAxios} = useSelector(state => state.axiosReducer)
    const enabled = useSelector(state => state.layoutInteractionReducer.actions?.actions?.enabled)

    const mode = props.mode;
    const form = props.form;
    const success = props.success !== undefined ? props.success : successAxios
    const [isChild, setIsChild] = useState(false)
    const dispatch = useDispatch()

    const drawerContext = useDrawerContext()
    const modalContext = useModalContext()

    useEffect(() => {
        if (!enabled && props?.permission !== undefined)
            dispatch(onChangeForbidden(true))
    }, [enabled])


    useEffect(() => {
        if (drawerContext?.setMode) {
            drawerContext?.setMode(mode)
            drawerContext?.setForm(form)
            setIsChild(true)
        }
        if (modalContext?.setMode) {
            modalContext?.setMode(mode)
            modalContext?.setForm(form)
            setIsChild(true)

        }
    }, [drawerContext, modalContext])


    const onChangeSuccessLocal = () => {
        if (props.onChangeSuccess) return props.onChangeSuccess()
        else return dispatch(onChangeSuccessAxios(false))
    }


    const validateMessages = {
        required: "${label}" + " " + t('common.required'),
    };

    return (
        <Form
            layout={props.layout ? props.layout : 'horizontal'}
            form={form}
            validateMessages={validateMessages}
            {...props}
            style={{
                overflow: "hidden"
            }}
        >

            <div>
                <DG_FormContext.Provider
                    value={isChild ? {
                            mode,
                            form
                        } :
                        {
                            mode, form, success, onChangeSuccess: onChangeSuccessLocal
                        }}
                >
                    {props.children}
                </DG_FormContext.Provider>
            </div>


        </Form>
    );
};

DG_Form.propTypes = {
    form: PropTypes.any.isRequired,
    mode: PropTypes.string.isRequired,
    success: PropTypes.bool,
    onChangeSuccess: PropTypes.func
};

export default DG_Form;
