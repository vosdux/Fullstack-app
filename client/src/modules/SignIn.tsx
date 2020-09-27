import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { errorModal } from '../helpers/Modal';

export interface ISignValue {
    email: string,
    password: string,
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SignIn = () => {
    const { login } = useContext(AuthContext);
    const { authRequest } = useHttp();

    const onFinish = async (values: ISignValue) => {
        try {
            const data = await authRequest(login, values);
            console.log(data);
            login(data);
        } catch (error) {
            errorModal('Ошибка', error.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='signup-card'><Card
            title='Войти'
        >
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Логин"
                    name="email"
                    rules={[{ required: true, message: 'Введите логин!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    );
};

export default SignIn;