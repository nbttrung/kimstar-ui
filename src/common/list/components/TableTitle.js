import React from 'react';
import {useSelector} from "react-redux";

const width = window.innerWidth;

const mapMaxWidth = (collapsed) => {

    let widthAdd = collapsed ? 200 : 0

    switch (width){
        case 2560:
            return 600 + widthAdd
        case 1920:
            return 347 + widthAdd
        case 1792:
            return 310 + widthAdd
        case 1680:
            return 250 + widthAdd
        case 1600:
            return 230 + widthAdd
        case 1536:
            return 200 + widthAdd
        case 1440:
            return 150 + widthAdd
        case 1366:
            return 130 + widthAdd
        default:
            return "100%"
    }
}
function TableTitle({title, tabs, extra, check}) {

    const path = window.location.pathname
    const path2 = path.split("/")[2]
    const {collapsed} = useSelector(state => state.layoutInteractionReducer)

    return (
        <div
            className={`bg-white w-full px-[24px] ${ check ? 'py-[7px]' : 'py-[22px]' } rounded-tl-[12px] rounded-tr-[12px]`} //chinh [padding cho table ]
            style={{
                borderRight: "1px solid #EAECF0",
                // borderLeft: "1px solid #EAECF0",
                borderTop: "1px solid #EAECF0",
                borderBottom: "1px solid #EAECF0",
                borderTopRightRadius: path2 !== "report-weighing-station" ? 12 : 0,
                borderTopLeftRadius: path2 !== "report-weighing-station" ? 12 : 0
            }}
            id={"header-filter"}
        >
            <div className="flex items-center justify-between">
                <div>
                    {title ?
                        <h3 className={"text-[18px] m-0 custom_h3"}
                            style={{color: "#101828" , maxWidth: mapMaxWidth(collapsed)}}>
                            {title}
                        </h3> : null}
                    {tabs}
                </div>
                {extra}
            </div>
        </div>
    );
}

export default TableTitle;
