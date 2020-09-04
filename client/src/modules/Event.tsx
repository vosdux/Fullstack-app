import React, { FC, useState } from 'react'
import { Row, Col, Card, Typography, List, Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { UserOutlined } from '@ant-design/icons'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import EventMainTab from '../components/EventMainTab'

const { Paragraph, Text, Title } = Typography;

const data = {
    caption: 'УНИЧТОЖЕНИЕ 2020',
    startDate: '22-10-1998',
    endDate: '22-10-1998',
    coordinate: [55.684758, 37.738521]
};

const tabList = [
    {
        key: 'main',
        tab: 'Главная',
    },
    {
        key: 'participants',
        tab: 'Участники',
    },
    {
        key: 'rules',
        tab: 'Правила',
    },
    {
        key: 'additional',
        tab: 'Дополнительная информация',
    },
];

interface IContentList {
    [k: string]: JSX.Element,
    main: JSX.Element,
    participants: JSX.Element,
    rules: JSX.Element,
    additional: JSX.Element
}

export interface IData {
    caption: string,
    startDate: string,
    endDate: string,
    coordinate: Array<number>
}

const Event: FC = () => {
    const [tabKey, setTabKey] = useState<string>('main');

    const contentList: IContentList = {
        main: <EventMainTab data={data} />,
        participants: <List
            itemLayout="horizontal"
            dataSource={[{ title: 'Иванов Иван' }]}
            pagination={{
                total: 10
            }}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />,
        rules: <Paragraph style={{ marginTop: 20 }}>
            Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
            Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
            a design language for background applications, is refined by Ant UED Team. Ant Design, a
            design language for background applications, is refined by Ant UED Team. Ant Design, a design
            language for background applications, is refined by Ant UED Team. Ant Design, a design
            language for background applications, is refined by Ant UED Team.
        </Paragraph>,
        additional: <p>content2</p>,
    };

    return (
        <Row style={{ paddingTop: 50 }}>
            <Col offset={4} span={16}>
                <Card
                    style={{ width: '100%' }}
                    title={data.caption}
                    tabList={tabList}
                    activeTabKey={tabKey}
                    onTabChange={setTabKey}
                >
                    {contentList[tabKey]}
                </Card>
            </Col>
        </Row>
    )
}

export default Event
