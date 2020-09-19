import React, { useContext, useState } from 'react';
import { Row, Col, Card, Avatar, Typography, Rate, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';
import { useRouteMatch } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import UserBiographyForm, { IUserBiography } from '../components/UserBiographyForm';
import { useHttp } from '../hooks/http.hook';

const { Title, Paragraph, Text, Link } = Typography;
interface IUserParams {
    params: any
}

const MainPage = ({ }) => {
    const { userId } = useContext(AuthContext);
    const match: IUserParams = useRouteMatch();
    const [modalVisible, setModalVisible] = useState<boolean>();
    const [rateModalVisible, setRateModalVisible] = useState<boolean>();
    const [data, setData] = useState<IUserBiography>();
    const { request, loading } = useHttp();

    const getUserData = async () => {
        try {
            const data = await request({
                url: '',
            })
            setData(data);
        } catch (error) { }
    }

    const changeUserData = async (values: IUserBiography) => {
        try {
            await request({
                url: '',
                method: 'post',
                data: values
            });
            getUserData();
        } catch (error) { }
    }

    return (
        <Row style={{ paddingTop: 50 }}>
            <Col offset={4} span={16}>
                <Card
                    loading={loading}
                    style={{ width: '100%' }}
                    title='Моя страница'
                    extra={match.params.userId === userId && <Button onClick={() => setModalVisible(true)} type='primary'>Изменить</Button>}
                //tabList={tabList}
                //activeTabKey={tabKey}
                //onTabChange={setTabKey}
                >
                    <Row>
                        <Col span={12} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <Avatar shape="square" size={250} icon={<UserOutlined />} />
                        </Col>
                        <Col sm={24} md={12} lg={12} xxl={12}>
                            <Title level={4}>Карпухов Артем</Title>
                            <Row>
                                <Link style={{ fontSize: 18 }}>СК УДАР</Link>
                            </Row>
                            <Row style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>
                                <Text>Позывной: Карп</Text>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Text style={{ paddingTop: 6, marginRight: 10 }}>Честность:</Text>
                                <Rate disabled defaultValue={2} />
                            </Row>
                            <Row>
                                <Text style={{ paddingTop: 6, marginRight: 10 }}>Дружелюбность:</Text>
                                <Rate disabled defaultValue={2} />
                            </Row>
                            <Row>
                                <Text style={{ paddingTop: 6, marginRight: 10 }}>Эффективность:</Text>
                                <Rate disabled defaultValue={2} />
                            </Row>
                            {match.params.userId !== userId && <Button>Оценить</Button>}
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Modal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
            >
                <UserBiographyForm 
                    onSubmit={changeUserData}
                />
            </Modal>
            <Modal
                visible={rateModalVisible}
                onCancel={() => setRateModalVisible(false)}
            >
                
            </Modal>
        </Row>
    );
};

export default MainPage;