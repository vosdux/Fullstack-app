import React, { useEffect } from 'react'
import { Layout } from 'antd';
import Navbar from './Navbar';
import { useRouteMatch, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

interface ILayout {
    children: JSX.Element
}

const MainLayout = ({ children }: ILayout) => {
    const match = useRouteMatch();
    const location = useLocation();

    return (
        <Layout>
            <Header>
                <Navbar active={location.pathname.split('/')[1]}/>
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout;
