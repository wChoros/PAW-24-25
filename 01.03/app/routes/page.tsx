import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.sass'


const Page = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default Page;