
export const fetchHistoricalData = async (coinId, currency, days) => {
    const url = `https://cryptotracker-backend-ayh3.onrender.com/api/historicalChart/${coinId}/${currency}/${days}`;
    return url;
};

export const SingleCoin = async (id) => {
    const url = `https://cryptotracker-backend-ayh3.onrender.com/api/singleCoin/${id}`;
    return url;
}

export const trendingCoins = (currency) => {
    const url = `https://cryptotracker-backend-ayh3.onrender.com/api/trendingCoins/${currency}`;
    return url;
}

export const coinsList = (currency) => {
    const url = `https://cryptotracker-backend-ayh3.onrender.com/api/coinsList/${currency}`;
    return url;
}