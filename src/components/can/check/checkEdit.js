

export const checkEdit = (account) => {
    if (account?.roleAll) {
        return true
    } else {
        let res1 = account.roleList?.filter(it => it.module === "account");
        return res1?.length > 0 && res1[0]?.roleCreate
    }
}

export const checkViewAccount = (account) => {
    if (account?.roleAll) {
        return true
    } else {
        let res1 = account.roleList?.filter(it => it.module === "account");
        return res1?.length > 0 && res1[0]?.roleView
    }
}

export const checkViewWeighingStation = (account, code) => {
    if (account?.roleAll) {
        return true
    } else {
        let res1 = account.roleList?.filter(it => it.module === code);
        return res1?.length > 0 && res1[0]?.roleView
    }
}

export const arrayPathAdmin = [
    "overview-seller" , "weighing-station" , "business-commissions" , "download" , "customer"
]