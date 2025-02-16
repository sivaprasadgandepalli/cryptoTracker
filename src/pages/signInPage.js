import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/crypto_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from 'react-hot-toast';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginWithEmail, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithEmail(email, password);
            toast.success("login successfull!");
            navigate('/');
        } catch (error) {
            console.error("Login error:", error.message);
            toast.error(`Login failed: ${error.message}`);
        }
    };

    const handleGoogleLogin = async (e) => {
        await googleSignIn();
        toast.success("login successfull!");
        navigate('/');

    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 md:p-4">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src={logo} // Replace with your logo path
                        alt="Crypto Tracker Logo"
                        className="w-20 h-20"
                    />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Welcome Back
                </h1>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                {/* Continue with Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-white text-gray-800 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300"
                >
                    <FcGoogle className="text-xl mr-2" />
                    Continue with Google
                </button>

                {/* Sign Up Link */}
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/SignUpPage" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;