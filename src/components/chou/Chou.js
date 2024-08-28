import {useEffect, useState} from "react";
import {DemoBlock, lorem} from "./Demos";
import {Tabs} from 'antd-mobile'
import {useThrottleFn} from "ahooks";
import {SearchOutlined} from "@ant-design/icons";
import {Flex} from "antd";
import imgProduct from "../../asset/logo/img_default_product.png";
import {dataTraiCay} from "./data";

const tabHeight = 42

const Chou = () => {

    const width = window.innerWidth
    const [activeKey, setActiveKey] = useState('1')

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
            return <img alt="logo" style={{width: 32, height: 32}}
                        src={img.thumbBase64}/>
        }

        return <div style={{
            width: 80,
            height: 80,
            backgroundColor: "#F5F5F5",
            border: "1px solid #D0D5DD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img alt="logo" style={{width: 80, height: 80}}
                 src={imgProduct}/>
        </div>
    }

    const renderItem = (data) => {
        return data.map(item => {
            return (
                <Flex key={item.id} children={null} gap={"small"} style={{marginTop: 20}}>
                    {mapImage(null)}
                    <div key={item.id + "_child"} style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
                        <div>
                            <div style={{fontWeight: 400, fontSize: 14}}>{item.name}</div>
                            <div className={"truncate"} style={{width: width - 120}}>{item.description || " "}</div>
                        </div>
                        <div style={{fontWeight: 600, fontSize: 16}}>
                            {item.promotionPrice}đ
                            <del style={{fontWeight: 200, fontSize: 13, marginLeft: 4}}>{item.price}đ</del>
                        </div>
                    </div>
                </Flex>
            )
        })
    }

    const tabItems = [
        {key: '1', title: 'Trà trái cây', text: renderItem(dataTraiCay)},
        {key: '2', title: 'Sinh tố', text: lorem.generateParagraphs(8)},
        {key: '3', title: 'Trà sữa', text: lorem.generateParagraphs(8)},
        {key: '4', title: 'Cheese', text: lorem.generateParagraphs(8)},
        {key: '5', title: 'Đá xay', text: lorem.generateParagraphs(8)},
        {key: '6', title: 'Cafe', text: lorem.generateParagraphs(8)},
    ]

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
    </>
}
export default Chou