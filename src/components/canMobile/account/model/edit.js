import {Col, Form, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getListWeighingStations} from "../../../../api/weighingStation";
import {mapDataRole} from "../../../can/account/common/mapDataRole";
import DgForm from "../../../../custom/data-entry/form";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ContentMobile from "./contentMobile";
import RoleMobile from "./roleMobile";
import {getAccountById, updateAccount} from "../../../../api/account";
import {onReloadData} from "../../../../redux/actions/layout/interaction/action";
import {RoleListMobile} from "./roleListMobile";

const Edit = ({onCancel, id, name, role}) => {

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
            getListWeighingStations().then(res => {

                const list = mapDataRole(res)
                const roleListAll = RoleListMobile.concat(list)

                if (r.roleList) {
                    const newState = roleListAll.map(obj => {
                        let res1 = r.roleList.filter(it => it.module === obj.module);
                        if (res1.length > 0) {
                            return {
                                ...obj,
                                id: res1[0].id,
                                roleView: res1[0].roleView,
                                roleCreate: res1[0].roleCreate
                            };
                        }
                        return obj;

                    });

                    form.setFieldsValue(
                        {
                            roleList: newState
                        }
                    )
                } else {
                    form.setFieldsValue(
                        {
                            roleList: roleListAll
                        }
                    )
                }

            })
                .catch(() => {})
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
            onCancel()
            dispatch(onReloadData(!reloadData))
        })
            .catch(() => {})
    }

    return (
        <>
            <div className={"py-2"}
                 style={{
                     borderBottom: "1px solid #D0D5DD",
                     backgroundColor: "#F2F4F7"
                 }}
            >
                <Row gutter={12}>
                    <Col span={1}/>
                    <Col span={2} className={"flex"}>
                        <ArrowLeftOutlined style={{fontSize: 20}} onClick={()=>onCancel()}/>
                    </Col>
                    <Col span={21} className={"flex items-center"}>
                        <span style={{
                            fontSize: 20,
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: "bold"
                        }}
                        >
                            {name}
                        </span>
                    </Col>
                </Row>
            </div>

            <div className={"p-6"}>
                <DgForm
                    form={form}
                    mode={"add"}
                    onFinish={onFinish}
                    colon={false}
                    labelAlign="left"
                    scrollToFirstError={true}
                >
                    <ContentMobile form={form}
                                   status={status}
                                   setStatus={(value) => setStatus(value ? "active" : "inactive")}
                                   next={false}
                                   id={id}/>

                    {
                        role !== "adminUser" && <RoleMobile form={form} />
                    }

                </DgForm>
            </div>
        </>
    )
}

export default Edit
