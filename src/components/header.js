import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { ArrowUpRight, Menu } from 'lucide-react';
import { useCurrency } from '../context/cryptoContext';
import { useAuth } from "../context/authContext";
import placeholder_img from "../assets/placeholder_img.webp";
import logo from "../assets/crypto_logo.png";
import Profile from './Profile';
export default function Header() {
    const [newCurrency, setNewCurrency] = useState('USD');
    const { changeCurrency } = useCurrency();
    const { user, googleSignIn, logout } = useAuth(); // Get the user state from useAuth
    const { photoURL } = user || {};
    const [show, setShow] = useState(false);
    const handleChange = (event) => {
        setNewCurrency(event.target.value);
    };

    const handleLogin = () => {
        window.location.href = '/signInPage';
    };

    const handleProfile = () => {
        setShow((prev) => !prev)
    }

    const handleLogout = async () => {
        await logout();
        window.location.href = "/signInPage";
    };

    useEffect(() => {
        changeCurrency(newCurrency);
    }, [newCurrency]);

    return (
        <div className='w-full relative'>
            <header className='flex items-center justify-between px-3 py-4 lg:px-[5rem] md:py-5 shadow-blue-900 shadow-sm'>
                <div className='flex items-center gap-x-[0.25rem] text-[#f8f8ff] font-bold'>
                    <img src={logo} className='h-8 w-8 md:h-10 md:w-10 cursor-pointer' referrerPolicy="no-referrer" alt='logo' />
                    <span className='text-[1.2rem] md:text-[1.4rem] italic'>Crypto<span className='text-emerald-500'>Trackr</span></span>
                </div>

                <div className='gap-x-5 text-stone-50 hidden md:flex'>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/Coins">Coins</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                </div>

                <div className='flex gap-x-2 md:gap-x-3 items-center'>
                    <select onChange={handleChange} className='hidden md:block px-[2px] py-[2px] md:py-[4px] md:px-2 text-[0.8rem] rounded-md bg-[#000435] text-[#f8f8ff] border-[1px]'>
                        <option value='USD'>USD</option>
                        <option value='INR'>INR</option>
                    </select>


                    {user ? (

                        <div className="flex items-center gap-x-3">
                            <img
                                src={photoURL || placeholder_img}
                                alt="Profile"
                                className="h-8 w-8 rounded-full"
                                onClick={handleProfile}
                            />
                        </div>
                    ) : (

                        <div className="flex gap-x-2">
                            <button
                                onClick={handleLogin}
                                className=" bg-[#EFEFEF] text-black py-1 px-3 rounded-full font-semibold antialiased text-[.9rem]"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleLogin}
                                className="hidden md:block bg-[#EFEFEF] text-black py-1 px-3 rounded-full font-semibold antialiased text-[.9rem]"
                            >
                                Register
                            </button>
                        </div>
                    )}

                    {/* <Menu className='text-[#f8f8ff] block md:hidden' /> */}
                </div>
            </header>
            {show && <Profile onClose={() => setShow(false)} />}
        </div>
    );
}