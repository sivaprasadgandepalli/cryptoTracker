import React, { useState, useEffect } from 'react';
import { useCurrency } from "../context/cryptoContext";
import LineChart from './ChartComponent';
import {fetchHistoricalData} from "../config/api"
const CoinMarketChart = ({ selectedCoin }) => {
    const { currency } = useCurrency();
    const [chartData, setChartData] = useState({ labels: [], data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHistoricalData(selectedCoin, currency);
                const labels = data.prices.map(price => new Date(price[0]).toLocaleDateString());
                const prices = data.prices.map(price => price[1]);
                setChartData({ labels, data: prices });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (selectedCoin) {
            fetchData();
        }
    }, [selectedCoin, currency]);

    if (loading) return <div>Loading chart...</div>;
    if (error) return <div>Error loading chart: {error}</div>;

    return <LineChart chartData={chartData} />;
};

export default CoinMarketChart;
