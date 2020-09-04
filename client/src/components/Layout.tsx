import React from 'react'
import { Layout } from 'antd';
import Navbar from './Navbar';

const { Header, Content } = Layout;

interface ILayout {
    children: JSX.Element
}

const MainLayout = ({ children }: ILayout) => {
    return (
        <Layout>
            <Header>
                <Navbar />
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout;
