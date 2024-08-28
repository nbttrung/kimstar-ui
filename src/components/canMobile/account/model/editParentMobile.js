import {Popup} from "antd-mobile";
import Edit from "./edit";

const EditParentMobile = ({visible, onCancel, id, name, role}) => {

    return (
        <Popup
            visible={visible}
            onMaskClick={() => onCancel()}
            position='right'
            bodyStyle={{ width: "100%" }}
            destroyOnClose={true}
        >
            <Edit id={id} onCancel={onCancel} name={name} role={role} />
        </Popup>
    )
}

export default EditParentMobile
