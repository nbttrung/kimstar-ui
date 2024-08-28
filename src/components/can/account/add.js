import {Form} from "antd";
import DgForm from "../../../custom/data-entry/form";
import Content from "./content";
import {addAccount} from "../../../api/account";
import {useDispatch, useSelector} from "react-redux";
import {onChangeVisibleDrawer, onReloadData} from "../../../redux/actions/layout/interaction/action";
import {useState} from "react";
import Role from "./component/role";

const Add = ({next, onNext}) => {

    const dispatch = useDispatch()
    const {reloadData} = useSelector(state => state.layoutInteractionReducer)
    const [form] = Form.useForm()
    const [status, setStatus] = useState("active")
    const onFinish = (value) => {

        if (next) {
            onNext()
        } else {
            value = {
                ...value,
                roleAll: false,
                status: status
            }
            addAccount(value).then(r => {
                dispatch(onChangeVisibleDrawer(false))
                dispatch(onReloadData(!reloadData))
            })
                .catch(() => {
                })
        }
    }

    return (
        <>
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
                <Content form={form}
                         status={status}
                         setStatus={(value) => setStatus(value ? "active" : "inactive")}
                         next={!next}/>

                {
                    !next && <Role form={form} />
                }

            </DgForm>
        </>
    )
}

export default Add
