import React from 'react';
import Header from '../../components/Home/Header/Header';

export default function HomeTemplate({ Component, ...restParams }) {
    return (
        <>
            <Header />
            <Component {...restParams}/>
        </>
    );
}
