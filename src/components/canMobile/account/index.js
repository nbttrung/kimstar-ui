import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllAccounts} from "../../../api/account";
import {DG_Format_Status} from "../../../format/Status";
import {setHeader} from "../../../redux/actions/layout/interaction/action";
import styled from "styled-components";
import {Col, FloatButton, List, Pagination, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AddParentMobile from "./model/addParentMobile";
import EditParentMobile from "./model/editParentMobile";

const StyledList = styled(List)`
  .ant-spin-container {
    height: ${(props) => props?.height + "px"};
    overflow-y: auto;
  }

  .ant-list-item {
    display: list-item !important;
    padding-right: 12px !important;
  }
`;

const AccountMobile = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const {reloadData} = useSelector(state => state.layoutInteractionReducer)
    const {account} = useSelector(state => state.permissionAccountActionReducer)
    const [dataSource, setDatSource] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [visible , setVisible] = useState(false)
    const [visibleEdit , setVisibleEdit] = useState(false)
    const [id , setId] = useState()
    const [name , setName] = useState()
    const [role , setRole] = useState()

    const height = useState(window.innerHeight);
    const mapDatasource = (data) => {
        if (!data) {
            return [];
        }
        return data?.map((item) => {
            return {
                ...item,
                status: DG_Format_Status(item.status),
            };
        });
    }

    useEffect(() => {
        dispatch(setHeader("Danh sách tài khoản"))
    }, [dispatch])

    useEffect(() => {
        getAllAccounts(searchParams.get("page"),
            searchParams.get("pageSize")).then(r => {
            setDatSource(mapDatasource(r.data))
            setTotal(r.totalPage)
        })
            .catch(() => {
            })

    }, [searchParams, reloadData, account])

    return (
        <div className={"h-full"}>
            {
                dataSource && <StyledList
                    height={height - 100}
                    size="small"
                    footer={<Row>
                        <Col span={24} className={"flex justify-start items-center"}>
                            {
                                total > 0 && <Pagination simple
                                                         pageSize={pageSize}
                                                         defaultCurrent={page}
                                                         total={total}
                                                         className={"flex text-center items-center"}
                                                         showQuickJumper
                                                         onChange={(page) => setPage(page)}/>
                            }
                            {
                                total > 0 &&
                                <div className={"customer_select_page"}>
                                    <Select
                                        defaultValue={pageSize}
                                        options={[
                                            {value: 20, label: 20},
                                            {value: 30, label: 30},
                                            {value: 50, label: 50},
                                            {value: 100, label: 100},
                                        ]}
                                        size={"small"}
                                        onChange={(value) => setPageSize(value)}
                                    />
                                </div>
                            }
                        </Col>
                    </Row>}
                    dataSource={dataSource}
                    renderItem={(item) => (
                        <List.Item className={"cursor-pointer custom_list_item"}
                                   onClick={()=>{
                                       setId(item.accountId)
                                       setName(item.name)
                                       setRole(item.role)
                                       setVisibleEdit(true)
                                   }}>
                            <Row>
                                <Col span={24} className={"font-semibold text-base"}>
                                    {item.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={17}>
                                    {item.role}
                                </Col>
                                <Col span={7}>
                                    {item.status}
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            }

            <FloatButton
                shape="square"
                type="primary"
                style={{right: 24}}
                icon={<PlusOutlined/>}
                onClick={()=>setVisible(true)}
            />

            <AddParentMobile visible={visible} onCancel={()=>setVisible(false)} />
            <EditParentMobile visible={visibleEdit}
                              onCancel={()=>setVisibleEdit(false)}
                              id={id}
                              name={name}
                              role={role}/>
        </div>
    )
}
export default AccountMobile
