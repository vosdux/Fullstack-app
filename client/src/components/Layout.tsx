import React, { useEffect } from 'react'
import { Layout } from 'antd';
import Navbar from './Navbar';
import { useRouteMatch, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

interface ILayout {
    children: JSX.Element,
    isAuthenticated: boolean,
}

const MainLayout = ({ children, isAuthenticated }: ILayout) => {
    const match = useRouteMatch();
    const location = useLocation();

    return (
        <Layout className='h-100'>
            <Header>
                <Navbar active={location.pathname.split('/')[1]} isAuthenticated={isAuthenticated}/>
            </Header>
            <Content className='h-100'>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout;
