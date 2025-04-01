import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from "app/components/menu";



const Page = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    );
};

export default Page;