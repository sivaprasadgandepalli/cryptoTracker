import React from 'react';
import { useCurrency } from '../context/cryptoContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchData } from '../hooks/fetchData';
import { trendingCoins } from '../config/api';
import CryptoLoader from './loader';

const Carousel = () => {
    const { currency, symbol } = useCurrency();
    const { data, error, loading } = useFetchData(trendingCoins(currency));

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 370,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading) return <CryptoLoader />;
    if (error) return <p className="text-red-500 text-center">Error loading data</p>;

    return (
        <div className="mx-auto w-[80%]" role="region" aria-label="Cryptocurrency carousel">
            <Slider {...settings}>
                {data.length > 0 ? data.map((item) => (
                    <div
                        key={item.id}
                        className="text-white flex flex-col items-center justify-center"
                        data-value={item.id}
                    >
                        <img 
                            src={item.image} 
                            alt={`${item.name} logo`} 
                            className='w-16 h-16 mb-2 object-contain' 
                        />
                        <div className='flex gap-x-2 text-md font-mono mx-auto'>
                            <span>{item.symbol.toUpperCase()}</span>
                            <span className={item.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                {item.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                        </div>
                        <h4 className='flex items-center gap-x-1 text-sm w-full text-center'>
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency,
                                maximumFractionDigits: 2
                            }).format(item.market_cap)}
                        </h4>
                    </div>
                )) : <p className="text-white text-center">No data available</p>}
            </Slider>
        </div>
    );
};

export default React.memo(Carousel);