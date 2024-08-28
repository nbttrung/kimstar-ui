import {Tag} from "antd";

const styleBorderRadius = {
    borderRadius: 30,
}
export const DG_Format_Status = (value) => {
    if (!value) return null
    switch (value) {
        case 'active':
            return  <Tag color='#DFF7E8' style={{ color: "#12B76A", borderRadius: 16 }} >Đang hoạt động</Tag>
        case 'inactive':
            return <Tag color='#F2F4F7' style={{ color: "#4C5768", borderRadius: 16 }}>Không hoạt động</Tag>
        default:
            return <Tag style={styleBorderRadius}>{value}</Tag>
    }

}
