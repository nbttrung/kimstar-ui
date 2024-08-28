import {Result,Image} from "antd";
import notFound from "../../asset/icon/trang bao loi-02.jpg"

const NotFound = ()=>{
    return(
        <Result
            icon={null}
            title={<Image
                width={890}
                height={712}
                src={notFound}
                preview={false}
            />}
        />
    )
}

export default NotFound
