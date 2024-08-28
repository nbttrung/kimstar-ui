import React, {useEffect, useState} from 'react';
import {Empty, Table} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {t} from "i18next";

const CommonList = ({
                        hasIndex, columns, dataSource, totalCount,
                        loading, title, hasFilterStatus, onChange,
                        ...rest
                    }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [thisColumns, setThisColumns] = useState(columns);
    const [totalPerPage, setTotalPerPage] = useState(0);

    useEffect(() => {
        if (hasIndex) {
            setThisColumns([
                {
                    dataIndex: "index",
                    title: "STT",
                    width: "75px",
                    align: "center",
                    render: (text, record, index) => <>
                        {JSON.parse(searchParams.get("pageSize") || 20) * (
                            JSON.parse(searchParams.get("page") || 1) - 1
                        ) + index + 1}
                    </>
                },
                ...columns
            ])
        }
    }, [hasIndex, searchParams , columns])

    const showTotal = (total, range) => {
        return `${range[0]} - ${range[1]} trong số ${total}`
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        const page = pagination.current
        const pageSize = pagination.pageSize
        const sortField = sorter.field
        const sortOrder = sorter.order

        setTotalPerPage(pagination.pageSize);

        searchParams.set("page", page)
        searchParams.set("pageSize", pageSize)
        // if (sorter.order !== undefined) {
        //     searchParams.set("sortField", sortField)
        //     searchParams.set("sortOrder", sortOrder)
        // }else {
        //     searchParams.delete("sortOrder")
        //     searchParams.delete("sortField")
        // }

        if (!!sortOrder) {

            searchParams.set("sort", `${sortField}:${sortOrder.replace("end", "")}`)
        } else {

            searchParams.delete("sort")
        }

        navigate(`?${searchParams.toString()}`)

        if (onChange) {
            onChange(pagination, filters, sorter, extra)
        }
    }

    return (
        <div
            className={"custom-table relative h-[93%] bg-white rounded-bl-[12px] rounded-br-[12px] overflow-hidden"}
            style={{
                borderRight: "1px solid #EAECF0",
                borderLeft: "1px solid #EAECF0",
                borderBottom: "1px solid #EAECF0",
            }}
        >
            <div className={`${Number(totalCount) <= Number(totalPerPage) ? "h-full" : "h-[90%]"} overflow-auto`}>
                <Table
                    sticky
                    columns={thisColumns}
                    dataSource={dataSource}
                    onChange={onChangeTable}
                    pagination={{
                        total: totalCount,
                        showTotal: showTotal,
                        showSizeChanger: true,
                        pageSizeOptions: [4, 8, 10, 20, 30],
                        pageSize: JSON.parse(searchParams.get("pageSize") || 20),
                        current: JSON.parse(searchParams.get("page") || 1),
                        hideOnSinglePage: true,
                        className: "absolute bottom-0 bg-white right-0 left-0 text-right p-3 !m-0"
                    }}
                    loading={loading}
                    {...rest}
                    rowClassName={`${rest?.rowClassName} max-h-[64px] h-[48px] overflow-hidden cursor-pointer`}
                    locale={{
                        emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("common.noData")}/>
                    }}
                />
            </div>
        </div>
    );
}

export default CommonList;
