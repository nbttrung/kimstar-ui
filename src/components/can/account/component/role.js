import {Col, Form, Input, Row, Switch} from "antd";
import React from "react";

const Role = (props) => {
    const onChange = (checked, key) =>{
        if (key === 1){

            const {roleList} = props.form.getFieldsValue()
            for (let i = 2; i < roleList.length; i++) {
                Object.assign(roleList[i], {
                    ...roleList[i],
                    roleView : checked
                });
            }
            props.form.setFieldsValue({roleList})
        }
    }
    const onChangeFalse = (checked, key) =>{
        if (key === 1){
            const {roleList} = props.form.getFieldsValue()
            for (let i = 2; i < roleList.length; i++) {
                Object.assign(roleList[i], {
                    ...roleList[i],
                    roleCreate : checked
                });
                if (checked){
                    Object.assign(roleList[1], {
                        ...roleList[1],
                        roleView : checked
                    });
                    Object.assign(roleList[i], {
                        ...roleList[i],
                        roleView : checked
                    });
                }
            }
            props.form.setFieldsValue({roleList})
        }else if (key > 1){
            const {roleList} = props.form.getFieldsValue()
            Object.assign(roleList[key], {
                ...roleList[key],
                roleView : checked
            });
            props.form.setFieldsValue({roleList})
        }
    }
    return (
        <>
            <Row gutter={12} className={"mb-2"}>
                <Col xxl={{span: 8}}
                     xl={{span: 8}}
                     lg={{span: 8}}
                     md={{span: 8}}>
                    <label className={"font-bold"}>Phân quyền</label>
                </Col>
                <Col xxl={{span: 8}}
                     xl={{span: 8}}
                     lg={{span: 8}}
                     md={{span: 8}}>
                    <label className={"font-bold"}>Xem</label>
                </Col>
                <Col xxl={{span: 8}}
                     xl={{span: 8}}
                     lg={{span: 8}}
                     md={{span: 8}}>
                    <label className={"font-bold"}>Chỉnh sửa</label>
                </Col>
            </Row>
            <Form.Item labelCol={{span: 8}}
                       wrapperCol={{span: 24}}>
                <Form.List name="roleList">
                    {(fields) => (
                        fields.map(field => {
                            return (
                                <Row style={{width: "100%"}}>
                                    <Col
                                        xxl={{span: 8}}
                                        xl={{span: 8}}
                                        lg={{span: 8}}
                                        className={"h-10"}
                                    >
                                        <Form.Item
                                            name={[field.name, 'moduleName']}
                                            className={"m-0"}
                                        >
                                            <Input bordered={false}
                                                   disabled={true}
                                                   rootClassName={"pl-0"}
                                                   style={{ color : "#344054" , height: 20, cursor: "pointer" }} />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xxl={{span: 8}}
                                        xl={{span: 8}}
                                        lg={{span: 8}}
                                        className={"h-10"}
                                    >
                                        <Form.Item
                                            name={[field.name, 'roleView']}
                                            valuePropName="checked"
                                            initialValue={false}
                                        >
                                            <Switch onChange={(checked)=>onChange(checked, field.name)} />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        xxl={{span: 8}}
                                        xl={{span: 8}}
                                        lg={{span: 8}}
                                        className={"h-10"}
                                    >
                                        <Form.Item
                                            name={[field.name, 'roleCreate']}
                                            valuePropName="checked"
                                            initialValue={false}
                                        >
                                            <Switch className={"ml-2"} onChange={(checked)=>onChangeFalse(checked, field.name)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )
                        })
                    )}
                </Form.List>
            </Form.Item>
        </>
    )
}

export default Role
