import React, { useState } from 'react';
import './style.sass';

interface Comment {
    id: number;
    postId: number;
    content: string;
    avatarUrl: string;
    username: string;
    handle: string;
}

const SinglePost: React.FC = () => {
    const [showComments, setShowComments] = useState(true);

    const post = {
        id: 1,
        title: "Exciting News!",
        content: "Just launched a new project. Check it out! #launch #excited",
        username: "John Doe",
        handle: "@johndoe",
        avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
        likes: 120,
        retweets: 45,
        views: 3000,
        timestamp: "3h ago",
        comments: [
            { id: 1, postId: 1, content: "Congrats! Can't wait to check it out.", avatarUrl: "https://randomuser.me/api/portraits/lego/2.jpg", username: "Jane Smith", handle: "@janesmith" },
            { id: 2, postId: 1, content: "Amazing work! Keep it up.", avatarUrl: "https://randomuser.me/api/portraits/lego/3.jpg", username: "Mike Johnson", handle: "@mikej" }
        ]
    };

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };

    return (

        <div className="post-container">
            <div className="post">
                <img className="avatar" src={post.avatarUrl} alt={`${post.username}'s avatar`} />
                <div className="post-content">
                    <div className="post-header">
                        <span className="username">{post.username}</span>
                        <span className="handle">{post.handle}</span>
                        <span className="timestamp">{post.timestamp}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-text">{post.content}</p>
                    <div className="post-actions">
                        <button className="action-button">
                            <i className="icon">🔄</i>
                            <span>{post.retweets}</span>
                        </button>
                        <button className="action-button">
                            <i className="icon">❤️</i>
                            <span>{post.likes}</span>
                        </button>
                        <button className="action-button">
                            <i className="icon">📊</i>
                            <span>{post.views}</span>
                        </button>
                        <button className="action-button">
                            <i className="icon">📤</i>
                        </button>
                    </div>
                    <button onClick={toggleComments} className="toggle-comments">
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </button>
                    {showComments && (
                        <div className="comments">
                            {post.comments.map(comment => (
                                <div className="comment" key={comment.id}>
                                    <img className="avatar" src={comment.avatarUrl} alt={`${comment.username}'s avatar`} />
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <span className="username">{comment.username}</span>
                                            <span className="handle">{comment.handle}</span>
                                        </div>
                                        <p className="comment-text">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="add-comment">
                        <input type="text" placeholder="Chirp your reply" className="comment-input" />
                        <button className="comment-button">Reply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
