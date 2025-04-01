import React, { useState } from 'react';
import './style.sass';

// Types based on Prisma schema
interface Comment {
    id: number;
    postId: number;
    content: string;
}

interface Category {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number | null;
    categoryId: number | null;
    Category: Category | null;
    Comment: Comment[];
}

// Additional types for UI display
interface PostWithUIData extends Post {
    username: string;
    handle: string;
    avatarUrl: string;
    likes: number;
    retweets: number;
    views: number;
    timestamp: string;
}

const Birder: React.FC = () => {
    // Hardcoded data based on Prisma schema
    const [posts, setPosts] = useState<PostWithUIData[]>([
        {
            id: 1,
            title: "Web Development Update",
            content: "Just launched my new website! Check it out and let me know what you think. #webdev #coding",
            published: true,
            authorId: 101,
            categoryId: 1,
            Category: {
                id: 1,
                name: "Technology"
            },
            Comment: [
                {
                    id: 101,
                    postId: 1,
                    content: "Looks amazing! Love the design."
                },
                {
                    id: 102,
                    postId: 1,
                    content: "Great work! What tech stack did you use?"
                }
            ],
            // UI display data
            username: "Jane Smith",
            handle: "@janesmith",
            avatarUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
            likes: 42,
            retweets: 12,
            views: 1024,
            timestamp: "2h ago"
        },
        {
            id: 2,
            title: "AI News",
            content: "Breaking: New AI model can generate entire websites from simple text descriptions. This could revolutionize web development! #AI #tech",
            published: true,
            authorId: 102,
            categoryId: 1,
            Category: {
                id: 1,
                name: "Technology"
            },
            Comment: [
                {
                    id: 201,
                    postId: 2,
                    content: "I've tried it. Impressive but still needs human touch."
                },
                {
                    id: 202,
                    postId: 2,
                    content: "Sounds like I'm going to be out of a job soon... 😅"
                },
                {
                    id: 203,
                    postId: 2,
                    content: "Can't wait to test this out! Anyone have a link?"
                }
            ],
            // UI display data
            username: "Tech News",
            handle: "@technews",
            avatarUrl: "https://randomuser.me/api/portraits/lego/2.jpg",
            likes: 285,
            retweets: 78,
            views: 5462,
            timestamp: "5h ago"
        },
        {
            id: 3,
            title: "Nature Photography",
            content: "Captured this amazing sunset at the beach yesterday. No filter needed! #photography #sunset #nature",
            published: true,
            authorId: 103,
            categoryId: 2,
            Category: {
                id: 2,
                name: "Photography"
            },
            Comment: [
                {
                    id: 301,
                    postId: 3,
                    content: "Stunning! Where was this taken?"
                },
                {
                    id: 302,
                    postId: 3,
                    content: "Great composition! What camera do you use?"
                }
            ],
            // UI display data
            username: "Nature Photographer",
            handle: "@naturepics",
            avatarUrl: "https://randomuser.me/api/portraits/lego/3.jpg",
            likes: 536,
            retweets: 128,
            views: 8921,
            timestamp: "1d ago"
        }
    ]);

    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

    const toggleComments = (postId: number) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    // Comment authors mapping (in a real app would be fetched from Users table)
    const commentAuthors: { [key: number]: { username: string, handle: string, avatarUrl: string } } = {
        101: { username: "Alex Johnson", handle: "@alexj", avatarUrl: "https://randomuser.me/api/portraits/lego/2.jpg" },
        102: { username: "Mike Thompson", handle: "@mikethompson", avatarUrl: "https://randomuser.me/api/portraits/lego/3.jpg" },
        201: { username: "Sarah Davis", handle: "@sarahdavis", avatarUrl: "https://randomuser.me/api/portraits/lego/4.jpg" },
        202: { username: "David Wilson", handle: "@dwilson", avatarUrl: "https://randomuser.me/api/portraits/lego/5.jpg" },
        203: { username: "Tech Enthusiast", handle: "@techenthusiast", avatarUrl: "https://randomuser.me/api/portraits/lego/6.jpg" },
        301: { username: "Travel Lover", handle: "@travellover", avatarUrl: "https://randomuser.me/api/portraits/lego/7.jpg" },
        302: { username: "Photography Tips", handle: "@phototips", avatarUrl: "https://randomuser.me/api/portraits/lego/8.jpg" }
    };

    return (
        <div className="birder">
            <main className="birder-content">
                <div className="feed">
                    {posts.map(post => (
                        <div className="post" key={post.id}>
                            <img className="avatar" src={post.avatarUrl} alt={`${post.username}'s avatar`} />

                            <div className="post-content">
                                <div className="post-header">
                                    <span className="username">{post.username}</span>
                                    <span className="handle">{post.handle}</span>
                                    <span className="timestamp">{post.timestamp}</span>
                                    {post.Category && (
                                        <span className="category"><a href="/categories">#{post.Category.name}</a></span>
                                    )}
                                </div>

                                <h3 className="post-title"><a href={`/post/${post.id}`}>{post.title}</a></h3>
                                <p className="post-text">{post.content}</p>

                                <div className="post-actions">
                                    <button onClick={() => toggleComments(post.id)}>
                                        <i className="icon">💬</i>
                                        <span>{post.Comment.length}</span>
                                    </button>
                                    <button>
                                        <i className="icon">🔄</i>
                                        <span>{post.retweets}</span>
                                    </button>
                                    <button>
                                        <i className="icon">❤️</i>
                                        <span>{post.likes}</span>
                                    </button>
                                    <button>
                                        <i className="icon">📊</i>
                                        <span>{post.views}</span>
                                    </button>
                                    <button>
                                        <i className="icon">📤</i>
                                    </button>
                                </div>

                                {showComments[post.id] && (
                                    <div className="comments">
                                        {post.Comment.map(comment => {
                                            // Get the author for this comment based on ID
                                            const author = commentAuthors[comment.id] || {
                                                username: "Anonymous User",
                                                handle: "@anonymous",
                                                avatarUrl: "https://randomuser.me/api/portraits/lego/6.jpg"
                                            };

                                            return (
                                                <div className="comment" key={comment.id}>
                                                    <img className="avatar" src={author.avatarUrl} alt={`${author.username}'s avatar`} />

                                                    <div className="comment-content">
                                                        <div className="comment-header">
                                                            <span className="username">{author.username}</span>
                                                            <span className="handle">{author.handle}</span>
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
                                            );
                                        })}

                                        <div className="add-comment">
                                            <img className="avatar" src="https://randomuser.me/api/portraits/lego/5.jpg" alt="Your avatar" />
                                            <input type="text" placeholder="Chirp your reply" />
                                            <button>Reply</button>
                                        </div>
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
