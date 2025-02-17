import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/ChartComponent";
import { fetchHistoricalData } from "../config/api";
import { useCurrency } from "../context/cryptoContext";

export default function SingleCoinPage() {
  const { currency } = useCurrency();
  const [days, setDays] = useState(1);
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { coinId } = useParams();

  // Fetch coin details
  const fetchCoinDetails = useCallback(async () => {
    if (!coinId) return;

    const cacheKey = `coin_${coinId}_${currency}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setCoinData(JSON.parse(cachedData));
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/singleCoin/${coinId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const coinDetails = await response.json();
      const processedData = {
        name: coinDetails.name,
        image: coinDetails.image.large,
        rank: coinDetails.market_cap_rank,
        description: coinDetails.description.en.split(". ").slice(0, 3).join(". ") + ".",
        currentPrice: coinDetails.market_data.current_price[currency.toLowerCase()],
        marketCap: coinDetails.market_data.market_cap[currency.toLowerCase()],
      };

      localStorage.setItem(cacheKey, JSON.stringify(processedData));
      setCoinData(processedData);
    } catch (error) {
      console.error("Error fetching coin details:", error);
      setError("Failed to fetch coin details. Please try again later.");
    }
  }, [coinId, currency]);

  // Fetch chart data
  const fetchChartData = useCallback(async () => {
    if (!coinId) return;

    const cacheKey = `chart_${coinId}_${currency}_${days}`;
    const cachedChart = localStorage.getItem(cacheKey);
    const cacheExpiry = localStorage.getItem(`${cacheKey}_expiry`);

    if (cachedChart && cacheExpiry && Date.now() < parseInt(cacheExpiry, 10)) {
      setChartData(JSON.parse(cachedChart));
      return;
    }

    try {
      const url = await fetchHistoricalData(coinId, currency, days);
      const response = await fetch(url, { method: "GET", headers: { accept: "application/json" } });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const formattedData = {
        labels: data.prices.map((entry) =>
          new Date(entry[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ),
        data: data.prices.map((entry) => parseFloat(entry[1].toFixed(4))),
      };

      localStorage.setItem(cacheKey, JSON.stringify(formattedData));
      localStorage.setItem(`${cacheKey}_expiry`, Date.now() + 5 * 60 * 1000);

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setError("Failed to fetch chart data. Please try again later.");
    }
  }, [coinId, currency, days]);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchCoinDetails();
        await fetchChartData();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchCoinDetails, fetchChartData]);

  // Memoized buttons for days selection
  const dayButtons = useMemo(() => {
    return [1, 7, 15, 30, 90, 365].map((day) => (
      <button
        key={day}
        onClick={() => setDays(day)}
        className={`px-4 py-2 rounded ${days === day ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
          } flex-grow whitespace-nowrap`}
      >
        {day} Days
      </button>
    ));
  }, [days]);

  if (error) {
    return <p className="text-center w-full text-red-500 col-span-full h-full mt-5">{error}</p>;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 p-2 min-h-[100dvh] justify-center">
      {loading ? (
        <p className="text-center w-full text-white col-span-full h-full mt-5">Loading data...</p>
      ) : (
        <>
          <div className="p-4 text-white rounded-lg flex flex-col overflow-hidden">
            <img src={coinData.image} alt={coinData.name} className="w-40 h-40 mb-2 mx-auto" />
            <h2 className="text-4xl font-bold text-center text-yellow-500">{coinData.name}</h2>
            <p className="text-sm text-gray-400 mt-4 text-balance my-2 whitespace-wrap italic">
              {coinData.description}
            </p>
            <p className="text-lg">Rank: #{coinData.rank}</p>
            <p className="text-lg">
              Current Price: {currency} {coinData.currentPrice.toLocaleString()}
            </p>
            <p className="text-lg">
              Market Cap: {currency} {coinData.marketCap.toLocaleString()}
            </p>
          </div>

          <div className="col-span-2 p-4 text-white rounded-lg">
            <LineChart key={`${currency}_${days}`} chartData={chartData} className="w-full h-full" />

            <div className="w-full flex gap-3 p-2 overflow-x-auto">
              {dayButtons}
            </div>
          </div>
        </>
      )}
    </div>
  );
}