
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

export default function WishList() {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setWishlist(savedWishlist);
        setCart(savedCart);
    }, []);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((car) => car.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const handleRent = (car) => {
        const alreadyInCart = cart.some((item) => item.id === car.id);
        if (!alreadyInCart) {
            const updatedCart = [...cart, car];
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        navigate("/cart");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 font-semibold mt-16">
            <UserNavbar />
            <h2 className="text-2xl mb-6">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center">No cars in wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {wishlist.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3 text-sm">
                                <p className="font-semibold leading-tight line-clamp-2">
                                    {car.brand} {car.model}
                                </p>

                                <div className="mt-2 space-y-1">
                                    <p className="text-green-700 font-bold text-lg">
                                        ₹{car.pricePerDay}
                                    </p>
                                    <p className="text-xs text-gray-500 line-through">
                                        ₹{car.pricePerDay + 1500}
                                    </p>
                                    <p className="text-xs text-green-600">Save extra 10%</p>
                                </div>

                                <div className="mt-3 flex gap-2">
                                    <button
                                        onClick={() => handleRent(car)}
                                        className="flex-1 text-center bg-indigo-600 text-white py-1.5 rounded text-sm hover:bg-indigo-700 transition"
                                    >
                                        Rent Now
                                    </button>
                                    <button
                                        onClick={() => removeFromWishlist(car.id)}
                                        className="px-3 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                                        title="Remove from wishlist"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
