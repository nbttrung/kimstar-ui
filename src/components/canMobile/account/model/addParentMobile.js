import {Popup} from "antd-mobile";
import Add from "./add";

const AddParentMobile = ({visible, onCancel}) => {

    return (
        <Popup
            visible={visible}
            onMaskClick={() => onCancel()}
            position='right'
            bodyStyle={{ width: "100%" }}
            destroyOnClose={true}
        >
            <Add onCancel={onCancel} />
        </Popup>
    )
}

export default AddParentMobile
