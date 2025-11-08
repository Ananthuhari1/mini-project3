import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('contactReviews')) || [];
        setReviews(savedReviews);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 mt-15">
            <AdminNavbar />
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h1 className="text-3xl font-bold text-center mb-8">📢 User Reviews</h1>
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-600">No messages yet.</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white rounded-xl shadow p-6">
                                <h3 className="text-xl font-semibold">{review.name}</h3>
                                <p className="text-sm text-gray-500">{review.email} | {review.timestamp}</p>
                                <p className="mt-4 text-gray-700">{review.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
