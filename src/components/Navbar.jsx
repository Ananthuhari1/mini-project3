import React, { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-200 via-green-400 to-green-200 shadow-md z-50 px-6 py-3">




            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src="/dreamdrivelogo.png"
                        alt="DreamDrive Logo"
                        className="h-10 w-10 object-contain"
                    />
                    <span className="text-3xl md:text-3xl font-bold text-green-800">
                        DreamDrive
                    </span>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-green-600 focus:outline-none"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="hidden md:flex space-x-4 text-sm md:text-base items-center">
                    <a href="/home" className="text-black font-semibold px-3 py-1 rounded-md hover:bg-green-100 transition">Home</a>
                    <a href="/loginpage" className="text-black font-semibold px-3 py-1 rounded-md hover:bg-green-100 transition">Login</a>
                    <a href="/registrationpage" className="text-black font-semibold px-3 py-1 rounded-md hover:bg-green-100 transition">Sign Up</a>
                </div>
            </div>


            {isOpen && (
                <div className="md:hidden mt-3 space-y-2">
                    <a href="/home" className="block text-black font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition">Home</a>
                    <a href="/loginpage" className="block text-black font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition">Login</a>
                    <a href="/registrationpage" className="block text-black font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition">Sign Up</a>
                </div>
            )}
        </nav>
    );
}
