import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar: FC = () => {
    const auth = useContext(AuthContext);
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1"><Link to={`/${auth.userId}`}>Моя страница</Link></Menu.Item>
                <Menu.Item key="2"><Link to={`/events`}>События</Link></Menu.Item>
            </Menu>
        </>
    )
}

export default Navbar
