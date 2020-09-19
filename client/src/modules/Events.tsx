import React, { useState } from 'react'
import { Col, Row, Card, List, Avatar, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import AddEventForm from '../components/AddEventForm';

const mock = [
    {
        title: 'УНИЧТОЖЕНИЕ 2020',
        description: 'ПОЛИГОН РСБ РАМЕНСКИЙ РАЙОН'
    },
    {
        title: 'УНИЧТОЖЕНИЕ 2020',
        description: 'ПОЛИГОН РСБ РАМЕНСКИЙ РАЙОН'
    },
]

const Events = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Row style={{ paddingTop: 50 }}>
            <Col offset={4} span={16}>
                <Card
                    style={{ width: '100%' }}
                    title="Список игр в которых вы участвуете"
                    extra={<>
                        <Link to='/events/map' style={{marginRight: 10}}>Посмотреть на карте</Link>
                        <Button type='primary' onClick={() => setModalVisible(true)}>Организовать игру</Button>
                    </>}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={mock}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
            <Modal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                width={600}
                footer={null}
                title="Заполните необходимую информацию"
                destroyOnClose={true}
            >
                <AddEventForm
                    onSubmit={() => { }}
                    onCancel={() => setModalVisible(false)}
                />
            </Modal>
        </Row>
    )
}

export default Events
