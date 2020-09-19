import React, { FC } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Row, Col, Card } from 'antd';

const MapPage: FC = () => {
    return (
        <YMaps>
            <Map
                width='100%'
                height='1000px'
                defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 10,
                }}
            >
                <Placemark />
            </Map>
        </YMaps>
    );
};

export default MapPage;