import {Form, Input} from "antd";
import React, {useState} from "react";

const RenderInputOnChange = ({form, name, placeholder, message, label, required , onChange }) => {

    const [check, setCheck] = useState(true)

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: required,
                    message: message
                },
            ]}
            normalize={(value, prevVal, prevVals) => value.replace(/^[ ]+$/g,'')  }
        >
            <Input placeholder={placeholder}
                   onChange={(e) => {
                       let value = e.target.value
                       if (check) {
                           form.setFieldValue(name, value.charAt(0).toUpperCase() + value.slice(1))
                           if (value) setCheck(false)
                       }
                       onChange(value)
                   }}/>
        </Form.Item>
    )
}

export default RenderInputOnChange
