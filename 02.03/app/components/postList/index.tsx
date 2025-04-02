import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './style.sass';



interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

const PostsList: React.FC = () => {
    const { data: posts, isLoading, isError, error } = useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id}>
                        <a href={`post?id=${post.id}`}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
