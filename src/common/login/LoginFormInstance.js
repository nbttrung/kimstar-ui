import React from 'react';
import DgForm from "../../custom/data-entry/form";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {useDispatch} from "react-redux";
import {loginStart} from "../../redux/actions/login/actions";
import {Link} from "react-router-dom";

function LoginFormInstance(props) {
    const [form] = Form.useForm()
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(loginStart(values));
    }

    return (
        <div className={"login-form bg-white md:px-11 rounded-2xl"}>
            <div className="login-form__inner">
                <DgForm
                    onFinish={onFinish}
                    layout={"vertical"}
                    form={form}
                    mode={"add" || "update"}
                >
                    <Form.Item
                        name="username"
                        label={"Tên đăng nhập"}
                        rules={[
                            {
                                required: true,
                                message: "Tên đăng nhập là trường bắt buộc",
                            },
                        ]}
                    >
                        <Input
                            maxLength={100}
                            className={"p-3 rounded-md w-full"}
                            placeholder={"Nhập tên đăng nhập"}
                            onInput={(e) =>
                                (e.target.value = e.target.value.toLowerCase())
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={"Mật khẩu"}
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu là trường bắt buộc",
                            },
                        ]}
                    >
                        <div className={"customer_input_password"}>
                            <Input.Password
                                placeholder={"Nhập mật khẩu"}
                            />
                        </div>
                    </Form.Item>

                    <Row>
                        <Col span={16}>
                            <Checkbox>
                                Giữ tôi luôn đăng nhập</Checkbox>
                        </Col>

                        <Col span={8}>
                            <Form.Item>
                                <Link to={"/forget-password"}>
                                    Quên mật khẩu?
                                </Link>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button
                        block
                        htmlType="submit"
                        className={"rounded-lg text-white transition-all mb-7 py-[10px]"}
                        style={{background: "#007FFF"}}
                    >
                        Đăng nhập
                    </Button>
                    {/*<div*/}
                    {/*    className={"copyright flex justify-center items-center"}*/}
                    {/*>*/}
                    {/*    <span className={"mx-1"}>Một sản phẩm của Dogoo</span>*/}
                    {/*    <span className={"justify-center"}>©</span>*/}
                    {/*    <span>2023</span>*/}
                    {/*</div>*/}
                </DgForm>
            </div>
        </div>
    );
}

export default LoginFormInstance;
