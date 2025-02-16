// Profile.js
import React from 'react';
import { useAuth } from '../context/authContext';
import defaultImage from '../assets/placeholder_img.webp';

function Profile({ onClose }) {
    const { user, logout } = useAuth();
    
    const handleLogout = () => {
        logout();
        onClose();
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[silver] rounded-lg p-8 max-w-md w-full mx-4 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>

                <div className="flex flex-col items-center">
                    <img
                        src={user.photoURL || defaultImage}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                    <h1 className="text-2xl font-bold mt-4 text-gray-800">
                        {user.displayName || 'User'}
                    </h1>
                    <p className="text-gray-600 mt-2">{user.email}</p>
                    <button
                        onClick={handleLogout}
                        className="mt-6 bg-rose-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-rose-700 transition duration-300"
                    >
                        Logout
                    </button>
                    <p className='text-gray-700 mt-2'>Privacy | policy</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;