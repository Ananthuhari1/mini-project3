import React, { useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';

export default function About() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingReviews = JSON.parse(localStorage.getItem('contactReviews')) || [];

        const newReview = {
            ...formData,
            timestamp: new Date().toLocaleString()
        };

        const updatedReviews = [...existingReviews, newReview];
        localStorage.setItem('contactReviews', JSON.stringify(updatedReviews));

        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 mt-15">
            <UserNavbar />
            <div className="min-h-screen bg-gray-50 text-gray-800">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">About DreamDrive</h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        At DreamDrive, we redefine luxury car rental with unmatched service and a wide fleet of high-end vehicles.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
                    <img
                        src="/teampicture.jpeg"
                        alt="Luxury car"
                        className="rounded-2xl shadow-lg"
                    />
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            DreamDrive is a premier car rental company that provides access to the most luxurious vehicles on the market. Whether it's a business trip or a weekend getaway, we help you travel in style.
                        </p>
                        <p className="text-gray-600">
                            Our mission is to offer convenience, comfort, and class with every drive. With flexible plans, easy bookings, and transparent pricing, we’re here to make your journey unforgettable.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-10 text-center">
                    <h2 className="text-3xl font-bold mb-6">🚗 Our Commitment</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        At DreamDrive, we believe renting a car should be as thrilling as driving it. That’s why we provide:
                    </p>
                    <ul className="text-left list-disc list-inside text-gray-600 space-y-2">
                        <li>✅ A luxurious fleet of top-brand cars maintained to perfection</li>
                        <li>✅ Transparent pricing without hidden charges</li>
                        <li>✅ Friendly customer service for a hassle-free experience</li>
                        <li>✅ Fast, easy, and secure online bookings</li>
                        <li>✅ Flexible rental periods for every occasion</li>
                    </ul>
                </div>

                <div className="bg-white py-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">📞 Contact Us</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions or want to book directly? We’re just a message away.
                        </p>
                        <form
                            className="grid md:grid-cols-2 gap-6 text-left"
                            onSubmit={handleSubmit}
                        >
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Your Message"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition w-full sm:w-auto"
                                >
                                    ✉️ Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
