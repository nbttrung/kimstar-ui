import CommonList from "../../../common/list";
import React, {useEffect, useState} from "react";
import {columns} from "./columns/columns";
import AddParent from "./addParent";
import TableTitle from "../../../common/list/components/TableTitle";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeStatus, getAllAccounts} from "../../../api/account";
import {DG_Format_Status} from "../../../format/Status";
import role from "../../../asset/icon/role.png"
import EditParent from "./EditParent";
import DgMenuApproval from "../../../common/menu/approval/Approval";
import {onReloadData} from "../../../redux/actions/layout/interaction/action";
import UpdateRoleParent from "./modal/updateRoleParent";
import {checkEdit} from "../check/checkEdit";

const Account = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const {reloadData} = useSelector(state => state.layoutInteractionReducer)
    const {account} = useSelector(state => state.permissionAccountActionReducer)
    const [dataSource, setDatSource] = useState()
    const [total, setTotal] = useState()
    const [visibleRole, setVisibleRole] = useState(false)
    const [id, setId] = useState()
    const [visible, setVisible] = useState()
    const [idUpdate, setIdUpdate] = useState()
    const [name, setName] = useState()
    const [roleUpdate, setRoleUpdate] = useState()
    const mapDatasource = (data) => {
        if (!data) {
            return [];
        }
        return data?.map((item) => {
            return {
                ...item,
                status: DG_Format_Status(item.status),
                menu: <div className={"flex justify-end"}>
                    {
                        item.role !== "adminUser" && checkEdit(account) &&
                        <>
                            <img src={role}
                                 className={"mr-5 cursor-pointer"}
                                 title={"Sửa quyền"}
                                 alt={"role"}
                                 onClick={(e) => {
                                     setVisibleRole(true)
                                     setId(item?.accountId)
                                 }}/>
                            <DgMenuApproval onOk={handleOK}
                                            title={"Thông báo thay đổi trạng thái tài khoản"}
                                            titleImg={"Chuyển trạng thái tài khoản"}
                                            id={item.accountId}
                                            status={item.status}
                                            active={"Bạn có chắc chắn muốn cấp hoạt động lại cho tài khoản?"}
                                            inactive={"Bạn có chắc chắn muốn ngưng hoạt động của tài khoản?"}/>
                        </>
                    }
                </div>
            };
        });
    }
    const loadData = (page, pageSize) => {
        getAllAccounts(page, pageSize).then(r => {
            setDatSource(mapDatasource(r.data))
            setTotal(r.totalPage)
        })
            .catch(() => {
            })
    }

    const handleOK = (id, status) => {
        changeStatus(id, {
            status: status
        }).then(r => {
            dispatch(onReloadData(!reloadData))
        })
            .catch(() => {
            })
    }

    useEffect(() => {
        loadData(searchParams.get("page"),
            searchParams.get("pageSize"))

    }, [searchParams.get("page"), searchParams.get("pageSize"), reloadData, account])

    return (
        <div className={"h-full"}>
            <TableTitle
                title={"Danh sách tài khoản"}
            />
            {
                dataSource && <CommonList
                    columns={columns}
                    totalCount={total}
                    dataSource={dataSource}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                if (checkEdit(account)) {
                                    setVisible(true)
                                    setIdUpdate(record.accountId)
                                    setName(record.name)
                                    setRoleUpdate(record.role)
                                }
                            }
                        }
                    }}
                />
            }
            <AddParent/>
            <UpdateRoleParent id={id}
                              onCancel={() => {
                                  setVisibleRole(false)
                                  setId(undefined)
                              }}
                              visible={visibleRole}/>
            <EditParent id={idUpdate}
                        role={roleUpdate}
                        visible={visible}
                        name={name}
                        onCancel={() => {
                            setVisible(false)
                            setIdUpdate(undefined)
                            setName(undefined)
                            setRoleUpdate(undefined)
                        }}/>
        </div>
    )
}
export default Account
