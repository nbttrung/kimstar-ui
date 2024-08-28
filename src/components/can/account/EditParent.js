import DgModal from "../../../custom/feedback/modal";
import Update from "./update";

const EditParent = ({id, role, visible, name, onCancel}) =>{

    return (
        <DgModal visible={visible}
                  width={1000}
                  onCancel={() => onCancel()}
                  title={name}
                  bodyStyle={{
                      minHeight: 100,
                      maxHeight: 600,
                      overflowY: "scroll",
                  }}
                  destroyOnClose={true}
                  okText={"Cập nhật"} >
            <Update id={id} role={role} onCancel={() => onCancel()} />
        </DgModal>
    )
}

export default EditParent
