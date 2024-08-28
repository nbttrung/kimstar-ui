import React, {useState} from 'react';
import DgForm from "../../custom/data-entry/form";
import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {forgetPassword} from "../../api/login/api";

function ForgetPasswordInstance(props) {
    const [form] = Form.useForm()
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = (values) => {
        setLoading(true)
        forgetPassword(values.email).then(r => {
            setLoading(false)
            message.success("Mật khẩu mới được gửi về email của bạn")
            navigate("/login")
        })
            .catch(()=>setLoading(false))
    }

    return (
        <div className={"login-form bg-white md:px-11 rounded-2xl"}>
            <div className="login-form__inner">
                <DgForm
                    onFinish={onFinish}
                    layout={"vertical"}
                    form={form}
                    mode={"update"}
                >
                    <Form.Item
                        name="email"
                        label={"Email của bạn"}
                        rules={[
                            {
                                required: true,
                                message: "Email là trường bắt buộc"
                            },
                            {
                                type: 'email',
                                message: "Email không đúng định dạng"
                            }
                        ]}
                    >
                        <Input
                            maxLength={100}
                            className={"p-3 rounded-md w-full"}
                            placeholder={"Nhập email của bạn"}
                            onInput={(e) =>
                                (e.target.value = e.target.value.toLowerCase())
                            }
                        />
                    </Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        className={"rounded-lg text-white transition-all mb-7 py-[10px]"}
                        style={{background: "#007FFF"}}
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                    <div className="actions-md flex justify-center items-center mb-2">
                        <div className={"forget-pass"}>
                            <Form.Item>
                                <Link to={"/login"}>
                                    Quay lại trang đăng nhập
                                </Link>
                            </Form.Item>
                        </div>
                    </div>
                </DgForm>
            </div>
        </div>
    );
}

export default ForgetPasswordInstance;
