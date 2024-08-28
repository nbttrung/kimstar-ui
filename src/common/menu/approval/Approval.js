import React, {useState} from 'react';
import {Modal} from "antd";
import PropTypes from 'prop-types';
import status from "../../../asset/icon/Vector.png"


const DG_Menu_Approval = props => {

    const id = props?.id
    const statusData = props?.status

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        props.onOk(id , mapStatus())
        setIsModalVisible(false);
    };

    const mapStatus = () =>{
        if (statusData === "active"){
            return "inactive"
        }

        if (statusData === "inactive"){
            return "active"
        }

        return ""
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <img src={status}
                 className={"mr-5 cursor-pointer"}
                 title={props.titleImg}
                 onClick={()=>setIsModalVisible(true)}
                 alt={status}/>
            <Modal
                title={props.title}
                visible={isModalVisible}
                onCancel={handleCancel}
                okText={'Chấp nhận'}
                cancelText={'Hủy'}
                destroyOnClose={true}
                {...props}
                onOk={handleOk}
            >
                {
                    statusData === "active" ?
                        <p>{props.inactive}</p> :
                        <p>{props.active}</p>
                }
            </Modal>
        </>
    );
};

DG_Menu_Approval.propTypes = {
    onOk: PropTypes.func.isRequired,

};

export default DG_Menu_Approval;
