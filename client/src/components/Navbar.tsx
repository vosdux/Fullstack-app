import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface INavbar {
    active: string
}

const Navbar = ({ active }: INavbar) => {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[active]}>
                <Menu.Item key="main"><Link to={`/main/${auth.userId}`}>Моя страница</Link></Menu.Item>
                <Menu.Item key="events"><Link to={`/events`}>События</Link></Menu.Item>
            </Menu>
        </>
    )
}

export default Navbar
