import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/crypto_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from 'react-hot-toast';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signUpWithEmail, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Passwords do not match!");
            return;
        }
        try {
            await signUpWithEmail(email, password);
            toast.success("Registered successfully!");
            return navigate("/")

        } catch (error) {
            console.error("Registration error:", error.message);
            toast.error(`Registration failed: ${error.message}`);
        }
    };


    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        await googleSignIn();
        //toast.success("Login success");
        return navigate("/")
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
                    Create an Account
                </h1>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-6">
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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
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

                {/* Login Link */}
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/signInPage" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;