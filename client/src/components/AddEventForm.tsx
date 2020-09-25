import React from 'react'
import { Form, Input, DatePicker, Button } from 'antd'
import { defaultDateTimeFormat } from '../helpers/constants';

const requiredRule = [{ required: true, message: 'Поле обязательно для заполнения' }]

const itemLayuot = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const buttonLayout = {
    wrapperCol: { offset: 16 }
};


interface IForm {
    onCancel: () => void,
    onSubmit: (values: IFormValues) => void
};

export interface IFormValues {
    caption: string,
    description?: string,
    startDate: string,
    endDate: string
}

const AddEventForm = ({ onCancel, onSubmit }: IForm) => {
    return (
        <Form
            name='create-evente'
            {...itemLayuot}
            onFinish={onSubmit}
        >
            <Form.Item name='caption' label='Название' rules={requiredRule}>
                <Input />
            </Form.Item>
            <Form.Item name='description' label='Описание'>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name='startDate' label='Дата начала' rules={requiredRule}>
                <DatePicker
                    showTime
                    format={defaultDateTimeFormat}
                />
            </Form.Item>
            <Form.Item name='endDate' label='Дата окончания'>
                <DatePicker
                    showTime
                    format={defaultDateTimeFormat}
                />
            </Form.Item>
            <Form.Item {...buttonLayout}>
                <Button type='primary' htmlType='submit' style={{ marginRight: 5 }}>Создать</Button>
                <Button onClick={onCancel}>Отменить</Button>
            </Form.Item>
        </Form>
    )
}

export default AddEventForm
