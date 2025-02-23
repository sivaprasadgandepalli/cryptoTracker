
export const fetchHistoricalData = async (coinId, currency, days) => {
    const url = `http://localhost:5000/api/historicalChart/${coinId}/${currency}/${days}`;
    return url;
};

export const SingleCoin = async (id) => {
    const url = `http://localhost:5000/api/singleCoin/${id}`;
    return url;
}

export const trendingCoins = (currency) => {
    const url = `http://localhost:5000/api/trendingCoins/${currency}`;
    return url;
}

export const coinsList = (currency) => {
    const url = `http://localhost:5000/api/coinsList/${currency}`;
    return url;
}