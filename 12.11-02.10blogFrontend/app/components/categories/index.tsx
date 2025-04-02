import React, { useState, useEffect } from 'react';
import './style.sass';

interface Category {
    id: number;
    name: string;
}

const SinglePost: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:2115/categories/');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='categories-view'>
            {categories.map(category => (
                <div key={category.id} className="category-item">
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default SinglePost;
