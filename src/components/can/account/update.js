import {Form} from "antd";
import DG_Form from "../../../custom/data-entry/form";
import Content from "./content";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAccountById, updateAccount} from "../../../api/account";
import {onReloadData} from "../../../redux/actions/layout/interaction/action";
import Role from "./component/role";

const Update = ({id, role, onCancel}) => {

    const dispatch = useDispatch()
    const {reloadData} = useSelector(state => state.layoutInteractionReducer)
    const [form] = Form.useForm()
    const [status, setStatus] = useState("active")

    const mapData = (data) => {
        return {
            name: data.name,
            phoneNumber: data.phoneNumber,
            screenName: data.screenName,
            status: data.status,
            password: undefined,
            roleAll: !data.roleAll,
            roleList: data.roleList
        }
    }

    useEffect(() => {
        getAccountById(id).then(r => {
            form.setFieldsValue(mapData(r));
            setStatus(r.status)
        })
            .catch(() => {})
    }, [form, id])

    const onFinish = (value) => {
        value = {
            ...value,
            roleAll: !value.roleAll,
            status: status
        }
        updateAccount( id, value).then(r => {
            onCancel(false)
            dispatch(onReloadData(!reloadData))
        })
            .catch(() => {})
    }

    return (
        <>
            <DG_Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                autoComplete="off"
                form={form}
                mode={"add"}
                onFinish={onFinish}
                colon={false}
                labelAlign="left"
                scrollToFirstError={true}
            >
                <Content role={role}
                         form={form}
                         status={status}
                         setStatus={(value) => setStatus(value ? "active" : "inactive")}
                         id={id}/>
                {
                    role !== "adminUser" && <Role form={form} />
                }

            </DG_Form>
        </>
    )
}

export default Update
