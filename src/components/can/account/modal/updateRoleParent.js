import DG_Modal from "../../../../custom/feedback/modal";
import UpdateRole from "./updateRole";

const UpdateRoleParent = ({id, visible, onCancel}) =>{

    return (
        <DG_Modal visible={visible}
                  width={1000}
                  onCancel={() => onCancel()}
                  title={"Cập nhật Quyền của tài khoản "}
                  bodyStyle={{
                      minHeight: 100,
                      maxHeight: 600,
                      overflowY: "scroll",
                  }}
                  destroyOnClose={true}
                  okText={"Lưu"} >
            <UpdateRole id={id} onCancel={onCancel} />
        </DG_Modal>
    )
}

export default UpdateRoleParent
