import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './style.sass';

const Page = () => {
    const [tweetContent, setTweetContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [missingField, setMissingField] = useState('');

    const handleChirp = async () => {
        try {
            const authorName = prompt('Enter your name:') || 'Anonymous';
            const tweetTitle = prompt('Enter title:') || 'New Chirp';
            const response = await fetch('http://localhost:2115/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: tweetTitle,
                    content: tweetContent,
                    published: true,
                    authorName,
                    avatarURL: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`, // Random avatar URL
                    categoryId: Math.floor(Math.random() * 6) + 1, // Random category ID from 1 to 6
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Chirp posted:', result);
                setTweetContent(''); // Clear the input field
                window.location.href = '/'; // Redirect to home
            } else {
                console.error('Failed to post chirp');
            }
        } catch (error) {
            console.error('Error posting chirp:', error);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setMissingField('');
    };

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
                    <input
                        type="text"
                        placeholder="What's happening?"
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                    />
                    <button onClick={handleChirp}>Chirp</button>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default Page;