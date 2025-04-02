import React, { useState, useEffect } from 'react';
import './style.sass';

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

const SinglePost: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [showComments, setShowComments] = useState(true);
    const [newComment, setNewComment] = useState<string>(''); // State for new comment input

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postId = window.location.pathname.split('/').pop();
                const response = await fetch(`http://localhost:2115/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data: Post = await response.json();
                setPost(data);
            } catch (error) {
                console.error(error);
                // Fallback to random data if fetch fails
                setPost({
                    id: 1,
                    title: "Exciting News!",
                    content: "Just launched a new project. Check it out! #launch #excited",
                    published: true,
                    authorName: "John Doe",
                    avatarURL: "https://randomuser.me/api/portraits/lego/1.jpg",
                    category: { id: 1, name: "Tech" },
                    comments: [
                        { id: 1, content: "Congrats! Can't wait to check it out.", authorName: "Jane Smith" },
                        { id: 2, content: "Amazing work! Keep it up.", authorName: "Mike Johnson" }
                    ]
                });
            }
        };

        fetchPost();
    }, []);

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; // Prevent empty comments
        const name = prompt("Please provide your Name", "Anonymous")
        try {
            const response = await fetch('http://localhost:2115/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: post?.id,
                    content: newComment,
                    authorName: name, // Replace with actual user name if available
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            const createdComment: Comment = await response.json();

            // Update the post's comments locally
            setPost(prevPost => {
                if (!prevPost) return null;
                return {
                    ...prevPost,
                    comments: [...prevPost.comments, createdComment],
                };
            });

            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error(error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-container">
            <div className="post">
                <img className="avatar" src={post.avatarURL} alt={`${post.authorName}'s avatar`} />
                <div className="post-content">
                    <div className="post-header">
                        <span className="username">{post.authorName}</span>
                        {post.category && <span className="category">{post.category.name}</span>}
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-text">{post.content}</p>
                    <button onClick={toggleComments} className="toggle-comments">
                        {showComments ? "Hide Comments" : "Show Comments"}
                    </button>
                    {showComments && (
                        <div className="comments">
                            {post.comments.map(comment => (
                                <div className="comment" key={comment.id}>
                                    <img className="avatar" src={`https://randomuser.me/api/portraits/lego/${comment.id % 10}.jpg`} alt={`${comment.authorName}'s avatar`} />
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <span className="username">{comment.authorName}</span>
                                        </div>
                                        <p className="comment-text">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="add-comment">
                        <input
                            type="text"
                            placeholder="Chirp your reply"
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="comment-button" onClick={handleCommentSubmit}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;