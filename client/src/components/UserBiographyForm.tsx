import React from 'react';
import { Form, Input, Button } from 'antd';

interface IBoigraphyForm {
    onSubmit: (values: IUserBiography) => void,
}

export interface IUserBiography {
    firstName: string,
    lastName: string,
    nickName: string,
    team: string
}

const UserBiographyForm = ({ onSubmit }: IBoigraphyForm) => {

    return (
        <Form
            name='user-biography'
            onFinish={onSubmit}
        >
            <Form.Item name='firstName' label='Имя'>
                <Input />
            </Form.Item>
            <Form.Item name='firstName' label='Фамилия'>
                <Input />
            </Form.Item>
            <Form.Item name='team' label='Команда'>
                <Input />
            </Form.Item>
            <Form.Item name='nickName' label='Позывной'>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type='primary'>Сохранить</Button>
            </Form.Item>
        </Form>
    );
};

export default UserBiographyForm;