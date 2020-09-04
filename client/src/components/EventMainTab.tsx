import React from 'react'
import { Row, Avatar, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { IData } from '../modules/Event';

const { Title, Paragraph, Text } = Typography;

interface IEventMain {
    data: IData
}

const EventMainTab = ({ data }: IEventMain) => {
    return (
        <>
            <Row justify='center'>
                <Avatar shape="square" size={150} icon={<UserOutlined />} />
            </Row>
            <Title level={4}>Сценарий</Title>
            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ marginTop: 20 }}>
                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                a design language for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team. Ant Design, a design
                language for background applications, is refined by Ant UED Team.
            </Paragraph>
            <Title level={4}>Дата проведения</Title>
            <Text>{`${data.startDate} - ${data.endDate}`}</Text>
            <Title level={4}>Место проведения</Title>
            <YMaps>
                <Map
                    width='100%'
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 10,
                    }}
                >
                    <Placemark geometry={data.coordinate} />
                </Map>
            </YMaps>
        </>
    )
}

export default EventMainTab
