import {Col, Form, Input, Row, Switch} from "antd";
import React, {useEffect, useState} from "react";
import {checkScreenName, getScreenName} from "../../../api/account";
import RenderInputOnChange from "../../../common/input/RenderInputOnChange";

const Content = (props) => {
    const [name, setName] = useState()
    const [changePass, setChangPass] = useState(true)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (name) {
                getScreenName(props.form?.getFieldValue("name")).then((response) => {
                    props.form.setFieldsValue({screenName: response})
                })
                    .catch(() => {
                    })
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [name, props.form])

    const renderChangePassword = () => {
        return (
            <>
                <Col
                    xxl={{span: 24}}
                    xl={{span: 24}}
                    lg={{span: 24}}
                >
                    <Form.Item
                        label={"Mật khẩu mới"}
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu mới là trường bắt buộc"
                            },
                        ]}
                        normalize={(value, prevVal, prevVals) => value.trim()}
                    >
                        <div className={"customer_input_password"}>
                            <Input.Password placeholder={"Nhập mật khẩu"} autoComplete="new-password"/>
                        </div>
                    </Form.Item>
                </Col>
                <Col
                    xxl={{span: 24}}
                    xl={{span: 24}}
                    lg={{span: 24}}
                >
                    <Form.Item
                        label={"Xác nhận mật khẩu"}
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu là trường bắt buộc"
                            },
                        ]}
                        normalize={(value, prevVal, prevVals) => value.trim()}
                    >
                        <div className={"customer_input_password"}>
                            <Input.Password placeholder={"Nhập mật khẩu"} autoComplete="new-password"/>
                        </div>
                    </Form.Item>
                </Col>
            </>
        )
    }

    const renderUpdate = () => {
        if (changePass) {
            return (
                <span className={"cursor-pointer mr-2"}
                      style={{color: "#007FFF"}}
                      onClick={() => setChangPass(false)}> Đặt lại Mật khẩu </span>
            )
        } else {
            return renderChangePassword()
        }
    }

    const screenNameValidator = async (_, value) => {
        if (!value) {
            return Promise.resolve();
        }
        let check = (await checkScreenName(value)).data.result
        if (check && !props.id) {
            return Promise.reject(new Error('Tên đăng nhập đã được sử dụng'));
        }
        return Promise.resolve();
    };

    return (
        <div className={!props.next ? "block" : "hidden"}>
            <Row gutter={12}>
                <Col
                    xxl={{span: 24}}
                    xl={{span: 24}}
                    lg={{span: 24}}
                >

                    <RenderInputOnChange form={props.form}
                                         name={"name"}
                                         label={"Họ và tên"}
                                         placeholder={"Nhập họ và tên"}
                                         onChange={(value) => {
                                             if (props.id === undefined)
                                                 setName(value.trim());
                                         }}/>
                </Col>
            </Row>

            <Row gutter={12}>
                <Col
                    xxl={{span: 24}}
                    xl={{span: 24}}
                    lg={{span: 24}}
                >
                    <Form.Item
                        label={"Tài khoản"}
                        name="screenName"
                        tooltip="Bạn không nên thay đổi tên đăng nhập hệ thống sinh ra chánh tình trạng có thể trùng tên đăng nhập "
                        rules={[
                            {validator: screenNameValidator},
                        ]}
                    >
                        <Input placeholder={"Nhập tên tài khoản"}
                               disabled={props.id} />
                    </Form.Item>
                </Col>
            </Row>

            {
                !props.id ?
                    <Row gutter={12}>
                        <Col
                            xxl={{span: 24}}
                            xl={{span: 24}}
                            lg={{span: 24}}
                        >
                            <Form.Item
                                label={"Mật khẩu"}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mật khẩu là trường bắt buộc"
                                    },
                                ]}
                                normalize={(value, prevVal, prevVals) => value.trim()}
                            >
                                <div className={"customer_input_password"}>
                                    <Input.Password placeholder={"Nhập mật khẩu"} autoComplete="new-password"/>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row> :
                    <Row gutter={12} className={"justify-end"}>
                        {
                            renderUpdate()
                        }
                    </Row>
            }

            {
                props.role === "adminUser" ? null :
                    <>
                        <Row gutter={12}>
                            <Col
                                xxl={{span: 24}}
                                xl={{span: 24}}
                                lg={{span: 24}}
                            >
                                <Form.Item
                                    label={"Trạng thái"}
                                    name="status"
                                    valuePropName="checked"
                                    initialValue={true}
                                >
                                    <Switch checked={props.status === "active"}
                                            onChange={(checked) => props.setStatus(checked)}/>
                                    <span
                                        className={"ml-3.5"}> {props.status === "active" ? "Hoạt động" : "Không hoạt động"} </span>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
            }
        </div>
    )
}

export default Content
