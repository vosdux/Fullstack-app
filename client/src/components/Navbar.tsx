import React, { FC, useContext } from 'react';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface INavbar {
    active: string,
    isAuthenticated: boolean,
}

const Navbar = ({ active, isAuthenticated }: INavbar) => {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className="logo" />
            {isAuthenticated && <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[active]}>
                <Menu.Item key="main"><Link to={`/main/${auth.userId}`}>Моя страница</Link></Menu.Item>
                <Menu.Item key="events"><Link to={`/events`}>События</Link></Menu.Item>
                <Button type='link' onClick={auth.logout}>Выйти</Button>
            </Menu>}
        </>
    )
}

export default Navbar
