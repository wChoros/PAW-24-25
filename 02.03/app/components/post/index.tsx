import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.sass'

interface Post {
    id: number;
    title: string;
    body: string;
}

const Post: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data: Post = await response.json();
                setPost(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <>
            <button>
                <a href="/">
                    Return Home
                </a>
            </button>
            <article>
                <header>
                    <h1>{post.title}</h1>
                </header>
                <section>
                    <p>{post.body}</p>
                </section>
            </article>
        </>
    );
};

export default Post;