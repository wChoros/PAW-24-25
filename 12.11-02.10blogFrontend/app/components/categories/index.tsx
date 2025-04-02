import React, { useState } from 'react';
import './style.sass';

interface Category {
    id: number;
    name: string;
}

const SinglePost: React.FC = () => {
    const categories: Category[] = [
        {
            id: 1,
            name: "Programming"
        },
        {
            id: 2,
            name: "Technology"
        },
        {
            id: 3,
            name: "Science"
        },
        {
            id: 4,
            name: "Health"
        },
        {
            id: 5,
            name: "Travel"
        },
        {
            id: 6,
            name: "Education"
        },
        {
            id: 7,
            name: "Sports"
        },
        {
            id: 8,
            name: "Music"
        },
        {
            id: 9,
            name: "Movies"
        },
        {
            id: 10,
            name: "Art"
        },
        {
            id: 11,
            name: "Gaming"
        }
    ];


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
