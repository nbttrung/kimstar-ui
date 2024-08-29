import {useEffect, useState} from "react";
import {DemoBlock} from "./Demos";
import {Popup, Tabs, Radio} from 'antd-mobile'
import {useThrottleFn} from "ahooks";
import {CloseOutlined, MinusOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Checkbox, Divider, Flex, Input, Space} from "antd";
import imgProduct from "../../asset/logo/img_default_product.png";
import {dataCafe, dataCheese, dataDaxay, dataSinhTo, dataTraiCay, dataTraSua} from "./data";
import {currencyFormat} from "./common";

const tabHeight = 42
const styleRadio = {
    '--icon-size': '18px',
    '--font-size': '14px',
    '--gap': '6px',
}
const Chou = () => {

    const width = window.innerWidth
    const [activeKey, setActiveKey] = useState('1')
    const [itemObject, setItemObject] = useState()
    const [visible, setVisible] = useState(false)

    const {run: handleScroll} = useThrottleFn(
        () => {
            let currentKey = tabItems[0].key
            for (const item of tabItems) {
                const element = document.getElementById(`anchor-${item.key}`)
                if (!element) continue
                const rect = element.getBoundingClientRect()
                if (rect.top <= tabHeight) {
                    currentKey = item.key
                } else {
                    break
                }
            }
            setActiveKey(currentKey)
        },
        {
            leading: true,
            trailing: true,
            wait: 100,
        }
    )

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const mapImage = (imgObjects) => {
        if (imgObjects && imgObjects.length > 0) {
            const img = imgObjects[0]
            return <img alt="logo" className={"w-8 h-8"}
                        src={img.thumbBase64}/>
        }

        return <div className={"w-20 h-20 flex items-center justify-center"}
                    style={{
                        backgroundColor: "#F5F5F5",
                        border: "1px solid #D0D5DD"
                    }}>
            <img alt="logo" className={"w-20 h-20"}
                 src={imgProduct}/>
        </div>
    }

    const renderItem = (data) => {
        return data.map(item => {
            return (
                <Flex key={item.id} children={null} gap={"small"} className={"mt-2.5"}>
                    {mapImage(null)}
                    <div key={item.id + "_child"} className={"flex justify-between flex-col"}>
                        <div>
                            <div className={"font-normal text-sm"}>{item.name}</div>
                            <div className={"truncate"} style={{width: width - 120}}>{item.description || " "}</div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div className={"font-semibold text-base"}>
                                {currencyFormat(item.promotionPrice, "vi")}đ
                                <del className={"font-extralight text-sm ml-1"}>
                                    {currencyFormat(item.price, "vi")}đ
                                </del>
                            </div>

                            <Button style={{backgroundColor: "#12a54a"}}
                                    shape="circle"
                                    onClick={() => {
                                        setVisible(true)
                                        setItemObject(item)
                                    }}
                                    icon={<PlusOutlined style={{fontSize: 13, color: "white"}}/>}/>
                        </div>
                    </div>
                </Flex>
            )
        })
    }

    const tabItems = [
        {key: '1', title: 'Trà trái cây', text: renderItem(dataTraiCay)},
        {key: '2', title: 'Sinh tố', text: renderItem(dataSinhTo)},
        {key: '3', title: 'Trà sữa', text: renderItem(dataTraSua)},
        {key: '4', title: 'Cheese', text: renderItem(dataCheese)},
        {key: '5', title: 'Đá xay', text: renderItem(dataDaxay)},
        {key: '6', title: 'Cafe', text: renderItem(dataCafe)},
        {key: '7', title: '', text: <div style={{height: 400}}/>},
    ]

    const mapDetail = (
        <div style={{backgroundColor: "rgb(245, 245, 245)", maxHeight: "100%"}} className={"overflow-auto"}>
            <div style={{
                height: 200,
                backgroundImage: 'url("https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60")'
            }}>
                <Button icon={<CloseOutlined/>}
                        shape={"circle"}
                        style={{
                            top: 20,
                            left: 10
                        }}
                        onClick={() => setVisible(false)}/>
            </div>
            <Flex children={null} vertical className={"p-2.5 bg-white"}>

                <Flex children={null} justify="space-between">
                    <Flex children={null} vertical>
                        <h2> {itemObject?.name} </h2>
                        <div> Giảm 50%</div>
                    </Flex>

                    <Flex children={null} vertical align={"end"}>
                        <Flex children={null} gap={"small"} align={"center"}>
                            <del style={{fontWeight: 200, fontSize: 13, marginLeft: 4}}>
                                {currencyFormat(itemObject?.price, "vi")}
                            </del>
                            <h3>{currencyFormat(itemObject?.promotionPrice, "vi")}</h3>
                        </Flex>

                        <div> Giá gốc</div>
                    </Flex>
                </Flex>

                <div className={"p-2.5"}> {itemObject?.description} </div>
            </Flex>
            {/*tùy chọn*/}
            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}><h3> Chọn size </h3> <span> Chọn 1</span>
                </Flex>
                <Space direction='vertical' block>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='1' style={styleRadio}>
                                Size M [+0]
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='2' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Size L</div>
                                    <div> + {currencyFormat(6000, "vi")} </div>
                                </Flex>
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Space>
            </Flex>

            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}><h3> Nóng/Lạnh </h3> <span> Chọn 1</span>
                </Flex>
                <Space direction='vertical' block>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='1' style={{...styleRadio, width: width - 40}}>
                                Nóng
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='2' style={styleRadio}>
                                Lạnh
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Space>
            </Flex>

            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}><h3> Lượng đường </h3> <span> Chọn 1</span>
                </Flex>
                <Space direction='vertical' block>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='1' style={{...styleRadio, width: width - 40}}>
                                0% đường
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='2' style={{...styleRadio, width: width - 40}}>
                                30% đường
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='3' style={{...styleRadio, width: width - 40}}>
                                50% đường
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='4' style={{...styleRadio, width: width - 40}}>
                                70% đường
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='5' style={{...styleRadio, width: width - 40}}>
                                100% đường
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Space>
            </Flex>

            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}><h3> Lượng đá </h3> <span> Chọn 1</span>
                </Flex>
                <Space direction='vertical' block>
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='1' style={{...styleRadio, width: width - 40}}>
                                0% đá
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='2' style={{...styleRadio, width: width - 40}}>
                                30% đá
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='3' style={{...styleRadio, width: width - 40}}>
                                50% đá
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='4' style={{...styleRadio, width: width - 40}}>
                                70% đá
                            </Radio>
                            <Divider style={{margin: 0}}/>
                            <Radio value='5' style={{...styleRadio, width: width - 40}}>
                                100% đá
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Space>
            </Flex>

            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}><h3> Topping </h3> <span> Không bắt buộc, tối đa 13</span>
                </Flex>
                <Space direction='vertical' block>
                    <Checkbox.Group>
                        <Space direction='vertical'>
                            <Checkbox value='1' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Trân châu sương mai</div>
                                    <div> + {currencyFormat(9000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='2' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Trân châu sợi</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='3' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Rau câu</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='4' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Pudding</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='5' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Thạch cà phê</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='6' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Thạch băng tuyết</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='7' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Macchiato cream cheese</div>
                                    <div> + {currencyFormat(9000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='8' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Trân châu hoàng kim</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='8' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Thạch trân châu ruby</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='9' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Đậu đỏ</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='8' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Trân châu ruby</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='10' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Khoai môn</div>
                                    <div> + {currencyFormat(9000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='11' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Cream cake</div>
                                    <div> + {currencyFormat(9000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                            <Divider style={{margin: 0}}/>
                            <Checkbox value='12' style={styleRadio}>
                                <Flex children={null} justify='space-between' style={{width: width - 60}}>
                                    <div> Hạt dẻ</div>
                                    <div> + {currencyFormat(8000, "vi")} </div>
                                </Flex>
                            </Checkbox>
                        </Space>
                    </Checkbox.Group>
                </Space>
            </Flex>

            <Flex children={null} vertical className={"p-2.5 mt-2.5 bg-white"}>
                <Flex gap={"small"} align={"baseline"} className={"pb-2.5"}>
                    <h3> Thêm lưu ý cho quán </h3> <span> Không bắt buộc</span>
                </Flex>
                <Divider style={{margin: 0}}/>
                <div className={"py-2.5 text-xs"}>
                    Việc thực hiện yêu cầu còn tùy thuộc vào khả năng của quán
                </div>
                <Divider style={{margin: 0}}/>
                <Flex gap={"large"} justify={"center"}
                      align={"center"} children={null}
                      className={"py-2.5"}>
                    <Button icon={<MinusOutlined style={{color: "#12a54a" }}/>} className={"h-8"}/>
                    <h3>0</h3>
                    <Button icon={<PlusOutlined style={{color: "#12a54a"}} />} className={"h-8"}/>
                </Flex>
            </Flex>
        </div>
    )

    return <>
        <DemoBlock title='Chou xin chào ' padding='0'>
            <div style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "var(--adm-color-background)",
            }}>
                <Flex children={<></>}>
                    <SearchOutlined/>
                    <Tabs
                        activeKey={activeKey}
                        onChange={key => {
                            document.getElementById(`anchor-${key}`)?.scrollIntoView()
                            window.scrollTo({
                                top: window.scrollY - tabHeight,
                            })
                        }}
                    >
                        {tabItems.map(item => (
                            <Tabs.Tab title={item.title} key={item.key}/>
                        ))}
                    </Tabs>
                </Flex>
            </div>
            <div>
                {tabItems.map(item => (
                    <div key={item.key}>
                        <h2 id={`anchor-${item.key}`}>{item.title}</h2>
                        {item.text}
                    </div>
                ))}
            </div>
        </DemoBlock>

        <Popup
            visible={visible}
            showCloseButton={false}
            onClose={() => {
                setVisible(false)
            }}
            onMaskClick={() => {
                setVisible(false)
            }}
            bodyStyle={{height: "100%"}}
        >
            {mapDetail}
        </Popup>
    </>
}
export default Chou
