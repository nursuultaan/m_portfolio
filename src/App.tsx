import React, { useState } from 'react';
import {
    CodeOutlined, MenuOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Layout, Menu, theme } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";

import ContactMe from "./components/ContactMe.tsx";
import AboutMe from "./components/AboutMe.tsx";
import Projects from "./components/Projects.tsx";
import useScreenSize from "./hooks/ScreenSizeHook.ts";

const {Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('About me ', '1', <UserOutlined/>),
    getItem('Projects', '2',<CodeOutlined />, [
        getItem('Iphone website', '3'),
        getItem('Pizza store', '4'),
        getItem('Chat App', '5'),
    ]),
    getItem('Contact me', '6',<SendOutlined />),
];



const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const isMobile = useScreenSize()
    const {
        token: {  borderRadiusLG },
    } = theme.useToken();

    const [selectedKey,setSelectedKey]= useState<string>("1");


    const renderContent =()=>{
        switch (selectedKey){

            case "1":
                return <AboutMe selectedKey={selectedKey}/>;
            case "6":
                return <ContactMe/>;
            default:
                return <Projects selectedKey={selectedKey}/>;

        }
    }
    console.log(isMobile);



    return (
        <Layout  className={"h-[100vh] relative "}>
            {
                isMobile && <MenuOutlined className={`absolute z-10 m-5 ${collapsed ? "block" : "hidden"}`}   onClick={() => setCollapsed((prev)=>!prev)} />
            }

            {

                isMobile ?
                    <Sider
                        breakpoint="md" // Breakpoint for responsive behavior
                        collapsedWidth="0" // Width when collapsed

                        className={`${collapsed ? "hidden" : "block"}`}
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <Menu theme="dark"  defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => setSelectedKey(e.key)} />
                    </Sider>
                    :
                    <Sider


                        collapsed={false}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <Menu theme="dark"  defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => setSelectedKey(e.key)} />
                    </Sider>
            }



            <Layout className={"bg-yellow-300" }>

                <Content className={"font-mono  " }  style={{ height: "100%"}}>
                    <div
                        className={`bg-yellow-300 ${collapsed ? "block" : "hidden"}` }
                        style={{

                            borderRadius: borderRadiusLG,
                            height: "100%",
                            width:"100%"
                        }}
                    >
                        {renderContent()}
                    </div>

                </Content>

            </Layout>
        </Layout>
);
};

export default App;