import React from 'react'
import Carousel from '../components/corouselComponent';
import CoinsTable from '../components/cryptoTable';
export default function Home() {
    return (
        <div className='w-full flex flex-col items-center justify-center'>

            <div className='text-white text-center py-[3rem] md:py-[5rem]'>
                <h1 className='text-[2.3rem] md:text-[3rem] font-bold font-sans'>Track RealTime</h1>
                <h1 className='text-[2.3rem] md:text-[3rem] font-bold font-sans'>Cryptocurrency Prices</h1>
                <p className=' px-5 text-[1rem] md:w-[50%] mx-auto mt-4 md:px-0 md:text-[1rem]'>Welcome to the world's largest cryptocurrency marketplace.Stay updated with the latest market trends and price movements of your favorite cryptocurrencies. Get accurate, real-time data at your fingertips.</p>
                <button className='px-7 py-2 bg-slate-100 text-black rounded-full text-[1rem] mt-[1.8rem] get-started'>Get Started</button>
            </div>

            <div className='w-full text-center my-5 px-4 md:px-0'>
                <h2 className='text-2xl md:text-4xl text-yellow-600 font-bold mb-10 underline underline-offset-4'>Trending Coins</h2>
                <Carousel/>
            </div>
            
            <CoinsTable/>
        </div>
    )
}
