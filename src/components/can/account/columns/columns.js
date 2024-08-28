
export const columns = [
    {
        title: "Họ và tên",
        dataIndex: "name",
        width: "41.8%"
    },
    {
        title: "Tài khoản",
        dataIndex: "screenName",
        // width: "11.65%"
    },

    {
        title: "Quyền",
        dataIndex: "textRole",
        // width: "11.65%"
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        // width: "11.65%"
    },
    {
        dataIndex: "menu",
        // width: '6%',
        onCell: record => {
            return {
                onClick: event => {
                    event.stopPropagation();
                }
            }
        },
    },
];
