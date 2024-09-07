import React, { useState } from 'react';
import {
    CloseOutlined,
    CodeOutlined, MenuOutlined,
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import ContactMe from "./components/ContactMe.tsx";
import AboutMe from "./components/AboutMe.tsx";
import Projects from "./components/Projects.tsx";
import useScreenSize from "./hooks/ScreenSizeHook.ts";

const { Content, Sider } = Layout;

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

const itemsDesktop: MenuItem[] = [
    getItem('Close', '1', <CloseOutlined />),
    getItem('About me', '2', <UserOutlined />),
    getItem('Projects', '3', <CodeOutlined />, [
        getItem('Iphone website', '4'),
        getItem('Pizza store', '5'),
        getItem('Karavan Website', '6'),
    ]),
    getItem('Contact me', '7', <SendOutlined />),
];


const itemsMobile: MenuItem[] = [
    getItem('About me', '2', <UserOutlined />),
    getItem('Projects', '3', <CodeOutlined />, [
        getItem('Iphone website', '4'),
        getItem('Pizza store', '5'),
        getItem('Karavan Website', '6'),
    ]),
    getItem('Contact me', '7', <SendOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const isMobile = useScreenSize();
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const [selectedKey, setSelectedKey] = useState<string>("2");

    const renderContent = () => {
        switch (selectedKey) {
            case "2":
                return <AboutMe selectedKey={selectedKey} />;
            case "7":
                return <ContactMe />;
            default:
                return <Projects selectedKey={selectedKey} />;
        }
    };

    const handleMenuClick = (e: { key: string }) => {
        if (e.key === "1") {
            setCollapsed(true); // Close the Sider when 'Close' is clicked
        } else {
            setSelectedKey(e.key);
        }
    };

    return (
        <Layout className={"h-[100vh] relative "}>
            {isMobile && <MenuOutlined className={`absolute z-10 m-5 ${collapsed ? "block" : "hidden"}`} onClick={() => setCollapsed((prev) => !prev)} />}

            {isMobile ? (
                <Sider
                    trigger={null}
                    breakpoint="md"
                    collapsedWidth="0"
                    className={`${collapsed ? "hidden" : "block"}`}
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={itemsDesktop} onClick={handleMenuClick} />
                </Sider>
            ) : (
                <Sider
                    collapsed={false}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={itemsMobile} onClick={handleMenuClick} />
                </Sider>
            )}

            <Layout className={"bg-yellow-300"}>
                <Content className={"font-mono"} style={{ height: "100%" }}>
                    <div
                        className={`bg-yellow-300 ${collapsed ? "block" : "hidden"}`}
                        style={{
                            borderRadius: borderRadiusLG,
                            height: "100%",
                            width: "100%"
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
