import {useEffect} from "react";
import Role from "../component/role";
import {changeRole, getAccountById} from "../../../../api/account";
import {getListWeighingStations} from "../../../../api/weighingStation";
import DgForm from "../../../../custom/data-entry/form";
import {Form} from "antd";
import {mapDataRole} from "../common/mapDataRole";
import {RoleList} from "../common/roleList";


const UpdateRole = ({id, onCancel}) => {

    const [form] = Form.useForm()

    useEffect(() => {
        getAccountById(id).then(r => {
            form.setFieldsValue(
                {
                    roleAll: !r.roleAll
                }
            )

            getListWeighingStations().then(res => {

                const list = mapDataRole(res)
                const roleListAll = RoleList.concat(list)

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
                .catch(() => {
                })
        })
            .catch(() => {
            })
    }, [form , id])

    const onFinish = (value) => {
        value = {
            ...value,
            roleAll: false
        }

        changeRole(id, value).then(r => {
            onCancel()
        })
            .catch(() => {
            })
    }

    return (
        <DgForm
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
            <Role form={form}/>
        </DgForm>
    )
}

export default UpdateRole
