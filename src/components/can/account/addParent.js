import DgModal from "../../../custom/feedback/modal";
import {useDispatch, useSelector} from "react-redux";
import {onChangeVisibleDrawer} from "../../../redux/actions/layout/interaction/action";
import Add from "./add";
import {useState} from "react";

const AddParent = () => {

    const dispatch = useDispatch()
    const {visibleDrawer} = useSelector(state => state.layoutInteractionReducer)
    const [okText, setOkText] = useState("Tiếp theo")
    const [okBack, setOkBack] = useState("Hủy")
    const [title, setTitle] = useState("Nhập thông tin cho tài khoản mới")
    const [back, setBack] = useState(false)
    const [next, setNext] = useState(true)

    return (
        <DgModal visible={visibleDrawer}
                  width={600}
                  onCancel={() => {
                      setTitle("Nhập thông tin cho tài khoản mới")
                      setOkBack("Hủy")
                      setOkText("Tiếp theo")
                      setBack(false)
                      setNext(true)
                      dispatch(onChangeVisibleDrawer(false))
                  }}
                  title={title}
                  bodyStyle={{
                      minHeight: 100,
                      maxHeight: 600,
                      overflowY: "scroll",
                  }}
                  destroyOnClose={true}
                  okText={okText}
                  okBack={okBack}
                  onBack={() => {
                      setTitle("Nhập thông tin cho tài khoản mới")
                      setOkBack("Hủy")
                      setOkText("Tiếp theo")
                      setBack(false)
                      setNext(true)
                  }}
                  back={back}>
            <Add next={next}
                 onNext={() => {
                     setTitle("Cấp quyền cho tài khoản mới của bạn ")
                     setOkBack("Quay lại")
                     setOkText("Tạo tài khoản")
                     setBack(true)
                     setNext(false)
                 }}/>
        </DgModal>
    )
}

export default AddParent
