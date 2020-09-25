import React from 'react';
import { List, Avatar } from 'antd';

const mock = [
    {
        title: 'УНИЧТОЖЕНИЕ 2020',
        description: 'ПОЛИГОН РСБ РАМЕНСКИЙ РАЙОН'
    },
    {
        title: 'УНИЧТОЖЕНИЕ 2020',
        description: 'ПОЛИГОН РСБ РАМЕНСКИЙ РАЙОН'
    },
];

const YoursGameList = () => {
    return (
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
    )
}

export default YoursGameList
