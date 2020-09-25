import React, { useState } from 'react'
import { Col, Row, Card, List, Avatar, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import AddEventForm, { IFormValues } from '../components/AddEventForm';
import YoursGameList from '../components/YoursGameList';
import AllGames from '../components/AllGames';
import { useHttp } from '../hooks/http.hook';

interface IContentList {
    [k: string]: JSX.Element,
    all: JSX.Element,
    your: JSX.Element,
}

const tabList = [
    {
        key: 'all',
        tab: 'Поиск игр',
    },
    {
        key: 'your',
        tab: 'Игры в которых вы учавствуете',
    },
];

const Events = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tabKey, setTabKey] = useState<string>('all');
    const { request, loading } = useHttp();

    const contentList: IContentList = {
        all: <AllGames />,
        your: <YoursGameList />
    };

    const createEvent = async (values: IFormValues) => {
        try {
            console.log(values)
            const data = await request({
                url: 'api/events',
                method: 'post',
                data: values
            });
            console.log(data);
        } catch (error) { console.log(error) }
    };

    return (
        <Row style={{ paddingTop: 50 }}>
            <Col offset={4} span={16}>
                <Card
                    style={{ width: '100%' }}
                    title="Список игр в которых вы участвуете"
                    extra={<>
                        <Link to='/events/map' style={{ marginRight: 10 }}>Посмотреть на карте</Link>
                        <Button type='primary' onClick={() => setModalVisible(true)}>Организовать игру</Button>
                    </>}
                    tabList={tabList}
                    activeTabKey={tabKey}
                    onTabChange={setTabKey}
                >
                    {contentList[tabKey]}
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
                    onSubmit={createEvent}
                    onCancel={() => setModalVisible(false)}
                />
            </Modal>
        </Row>
    )
}

export default Events
