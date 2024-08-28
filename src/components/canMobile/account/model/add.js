import {Col, Form, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getListWeighingStations} from "../../../../api/weighingStation";
import {mapDataRole} from "../../../can/account/common/mapDataRole";
import DgForm from "../../../../custom/data-entry/form";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ContentMobile from "./contentMobile";
import RoleMobile from "./roleMobile";
import {RoleListMobile} from "./roleListMobile";
import {addAccount} from "../../../../api/account";
import {onReloadData} from "../../../../redux/actions/layout/interaction/action";

const Add = ({onCancel}) => {

    const dispatch = useDispatch()
    const {reloadData} = useSelector(state => state.layoutInteractionReducer)
    const [form] = Form.useForm()
    const [status, setStatus] = useState("active")
    const [title, setTitle] = useState("Tạo mới tài khoản")
    const [next, setNext] = useState(true)

    useEffect(() => {

        getListWeighingStations().then(r => {

            const list = mapDataRole(r)
            const roleListAll = RoleListMobile.concat(list)

            form.setFieldsValue(
                {
                    roleList: roleListAll
                }
            )
        })
            .catch(() => {
            })
    }, [form])
    const onFinish = (value) => {

        if (next) {
            setNext(false)
            setTitle("Phần quyền cho tài khoản mới")
        } else {
            value = {
                ...value,
                roleAll: false,
                status: status
            }
            addAccount(value).then(r => {
                dispatch(onReloadData(!reloadData))
                onCancel()
            })
                .catch(() => {
                })
        }
    }

    const onClick = () =>{
        if (!next){
            setNext(true)
            setTitle("Tạo mới tài khoản")
        }else {
            onCancel()
        }
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
                        <ArrowLeftOutlined style={{fontSize: 20}} onClick={onClick}/>
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
                            {title}
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
                                   next={!next} />

                    {
                        !next && <RoleMobile form={form}/>
                    }

                </DgForm>
            </div>
        </>
    )
}

export default Add
