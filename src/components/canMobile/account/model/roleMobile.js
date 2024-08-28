import {Button, Col, Form, Row, Switch} from "antd";
import React from "react";

const RoleMobile = (props) => {
    const onChange = (checked, key) => {
        if (key === 1) {

            const {roleList} = props.form.getFieldsValue()
            for (let i = 2; i < roleList.length; i++) {
                Object.assign(roleList[i], {
                    ...roleList[i],
                    roleView: checked
                });
            }
            props.form.setFieldsValue({roleList})
        }
    }
    const onChangeFalse = (checked, key) => {
        if (key === 1) {
            const {roleList} = props.form.getFieldsValue()
            for (let i = 2; i < roleList.length; i++) {
                Object.assign(roleList[i], {
                    ...roleList[i],
                    roleCreate: checked
                });
                if (checked) {
                    Object.assign(roleList[1], {
                        ...roleList[1],
                        roleView: checked
                    });
                    Object.assign(roleList[i], {
                        ...roleList[i],
                        roleView: checked
                    });
                }
            }
            props.form.setFieldsValue({roleList})
        } else if (key > 1) {
            const {roleList} = props.form.getFieldsValue()
            Object.assign(roleList[key], {
                ...roleList[key],
                roleView: checked
            });
            props.form.setFieldsValue({roleList})
        }
    }

    return (
        <>
            <Form.Item >
                <Form.List name="roleList">
                    {(fields) => (
                        fields.map(field => {
                            return (
                                <>
                                    <Row >
                                        <Col
                                            xxl={{span: 24}}
                                            xl={{span: 24}}
                                            lg={{span: 24}}
                                        >
                                            <Form.Item
                                                name={[field.name, 'moduleName']}
                                                className={"m-0"}
                                            >
                                                <div className={ field.name <= 1 ? "font-semibold" : "font-normal"}>
                                                    {props.form.getFieldValue("roleList")[field.name].moduleName}
                                                </div>
                                                <div >
                                                    {props.form.getFieldValue("roleList")[field.name]?.title}
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col
                                            xxl={{span: 8}}
                                            xl={{span: 8}}
                                            lg={{span: 8}}
                                            className={"h-10 flex items-center"}
                                        >
                                            <Form.Item
                                                name={[field.name, 'roleView']}
                                                valuePropName="checked"
                                                initialValue={false}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Switch onChange={(checked)=>onChange(checked, field.name)} />
                                            </Form.Item>
                                            {
                                                field.name === 1 ?
                                                    <span className={"ml-2"}> Xem tất cả </span> :
                                                    <span className={"ml-2"}> Xem </span>
                                            }
                                        </Col>
                                        <Col span={ field.name === 1 ? 2 : 5} />
                                        <Col
                                            xxl={{span: 8}}
                                            xl={{span: 8}}
                                            lg={{span: 8}}
                                            className={"h-10 flex items-center"}
                                        >
                                            <Form.Item
                                                name={[field.name, 'roleCreate']}
                                                valuePropName="checked"
                                                initialValue={false}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Switch className={"ml-2"} onChange={(checked)=>onChangeFalse(checked, field.name)} />
                                            </Form.Item>
                                            {
                                                field.name === 1 ?
                                                    <span className={"ml-2"}> chỉnh sửa tất cả </span> :
                                                    <span className={"ml-2"}> chỉnh sửa </span>
                                            }
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    )}
                </Form.List>
            </Form.Item>

            <Row>
                <Col span={5}/>
                <Col span={14}>
                    <Button type="primary" htmlType="submit" className={"w-full"}>
                        Tạo mới tài khoản
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default RoleMobile
