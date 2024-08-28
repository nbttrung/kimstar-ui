import React, {useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {loginStart} from "../../redux/actions/login/actions";


const {Item} = Form
const {Title, Text} = Typography;

const LoginForm = props => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const {urlHistory} = useSelector(state => state.actionHistoryReducer)


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        dispatch(loginStart(values.username, values.password));
    }


    return (
        <>
            <Button type="text" onClick={showModal} style={{"margin":"0px", "padding":"0px"}}>
                <Title level={5} style={{"color":"#6b6c7e", "margin":"0px",
                    "fontFamily":"var(--font-family-base, system-ui, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen-sans, ubuntu, cantarell, \"Helvetica Neue\", arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\")"
                }}>Sign In</Title>
            </Button>
            <Modal title="Sign In"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText="Sign In"
                   cancelText="Cancel"
                   footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Item
                        name="username"
                        label="Username"
                    >
                        <Input/>
                    </Item>

                    <Item
                        name="password"
                        label="Password"
                    >
                        <Input.Password/>
                    </Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Row gutter={12}>

                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button htmlType="submit" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

LoginForm.propTypes = {};

export default LoginForm;