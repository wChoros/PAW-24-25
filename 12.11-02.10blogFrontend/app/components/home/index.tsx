import React, { useState, useEffect } from 'react';
import './style.sass';

// Types based on Prisma schema
interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorName: string;
    avatarURL: string;
    category: Category | null;
    comments: Comment[];
  }

  interface Category {
    id: number;
    name: string;
  }

  interface Comment {
    id: number;
    content: string;
    authorName: string;
  }

const Birder: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:2115/posts');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const toggleComments = (postId: number) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="birder">
            <main className="birder-content">
                <div className="feed">
                    {posts.map(post => (
                        <div className="post" key={post.id}>
                            <img
                                className="avatar"
                                src={post.avatarURL}
                                alt="Random avatar"
                            />

                            <div className="post-content">
                                <div className="post-header">
                                    <span className="username">{post.authorName}</span>
                                    <span className="handle">@{post.authorName?.toLowerCase().replace(' ', '') || '@unknown'}</span>
                                    <span className="timestamp">{Math.floor(Math.random() * 24)}h ago</span>
                                    {post.category && (
                                        <span className="category"><a href="/categories">#{post.category.name}</a></span>
                                    )}
                                </div>

                                <h3 className="post-title"><a href={`/post/${post.id}`}>{post.title}</a></h3>
                                <p className="post-text">{post.content}</p>

                                <div className="post-actions">
                                    <button onClick={() => toggleComments(post.id)}>
                                        <i className="icon">💬</i>
                                        <span>{post.comments.length}</span>
                                    </button>
                                    <button>
                                        <i className="icon">🔄</i>
                                        <span>{Math.floor(Math.random() * 100)}</span>
                                    </button>
                                    <button>
                                        <i className="icon">❤️</i>
                                        <span>{Math.floor(Math.random() * 1000)}</span>
                                    </button>
                                    <button>
                                        <i className="icon">📊</i>
                                        <span>{Math.floor(Math.random() * 10000)}</span>
                                    </button>
                                    <button>
                                        <i className="icon">📤</i>
                                    </button>
                                </div>

                                {showComments[post.id] && (
                                    <div className="comments">
                                        {post.comments.map(comment => (
                                            <div className="comment" key={comment.id}>
                                                <img
                                                    className="avatar"
                                                    src={`https://randomuser.me/api/portraits/lego/${comment.id % 10}.jpg`}
                                                    alt="Random avatar"
                                                />

                                                <div className="comment-content">
                                                    <div className="comment-header">
                                                        <span className="username">{comment.authorName}</span>
                                                        <span className="handle">@{comment.authorName?.toLowerCase().replace(' ', '')}</span>
                                                        <span className="timestamp">recently</span>
                                                    </div>

                                                    <p className="comment-text">{comment.content}</p>

                                                    <div className="comment-actions">
                                                        <button>
                                                            <i className="icon">💬</i>
                                                        </button>
                                                        <button>
                                                            <i className="icon">❤️</i>
                                                            <span>0</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Birder;
