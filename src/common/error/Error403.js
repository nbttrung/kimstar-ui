import {Image, Result} from "antd";
import React from "react";
import notFound from "../../asset/icon/trang bao loi-01.jpg";

const Error403 = () => {
    return (
        <Result
            icon={null}
            title={<Image
                width={889}
                height={712}
                src={notFound}
                preview={false}
            />}
        />
    );
};

export default Error403;
