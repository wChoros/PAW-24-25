import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.sass'


const Page = () => {
    return (
        <>
            <div className="birder-main-page">
                <header className="birder-header">
                    <a href="/">
                        <div className="logo">
                            <i className="bird-icon">🐦</i>
                            <h1>Birder</h1>
                        </div>
                    </a>
                </header>
                <div className="compose-tweet">
                    <img src="https://randomuser.me/api/portraits/lego/5.jpg" alt="Your avatar" />
                    <input type="text" placeholder="What's happening?" />
                    <button>Chirp</button>
                </div>
                <Outlet />
            </div>

        </>
    );
};

export default Page;