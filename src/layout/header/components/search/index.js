import React, {useEffect, useMemo, useState} from 'react';
import {Input} from "antd";
import {FiSearch} from "react-icons/fi"
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeSearch} from "../../../../redux/actions/layout/interaction/action";

function HeaderSearch(props) {

    const [searchParams] = useSearchParams()
    const [value, setValue] = useState(searchParams.get("search") || "")
    const dispatch = useDispatch()
    let navigate = useNavigate();


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (value === "") {
                searchParams.delete("search")
            } else {
                searchParams.delete("search")
                searchParams.append("search", value)
            }
            navigate(`?${searchParams.toString()}`)

        }, 500)
        return () => clearTimeout(delayDebounceFn)

    }, [value, navigate, searchParams])

    useMemo(() => {
        const str = searchParams.get("search") || null
        dispatch(dispatch(changeSearch(str)))
        setValue(str || "")
    }, [searchParams, dispatch])

    return (
        <div className={"customer_input"}>
            <Input
                placeholder="Tìm kiếm"
                allowClear={true}
                prefix={<FiSearch className={"text-[17px]"}/>}
                className={"custom-search mr-[24px] w-[393px] rounded-lg px-[15px]"}
                onChange={e => {
                    setValue(e.target.value)
                }}
            />
        </div>
    );
}

export default HeaderSearch;
