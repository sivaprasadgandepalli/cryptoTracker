import React from 'react';
import { useFetchData } from '../hooks/fetchData';
import { coinsList } from '../config/api';
import { useCurrency } from '../context/cryptoContext';
import CryptoLoader from '../components/loader';
import { useNavigate } from 'react-router-dom';
export default function Coins() {
  const { currency, symbol } = useCurrency();
  const { data, error, loading } = useFetchData(coinsList(currency));

  const navigate = useNavigate();

  // React.useEffect(() => {
  //   console.log(data);

  // }, [data])

  const handleCoinClick = (id) => {
    navigate('/SingleCoinPage', { state: { coinId: id, currency: currency } })
  }

  if (loading) {
    return (
      <CryptoLoader />
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center text-red-500">
        <p>Error loading data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[88%] px-2 mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {Array.isArray(data) ? (
        data.map((item) => (
          <div
            key={item.id}
            className="text-white flex flex-col cursor-pointer items-center justify-center border-[1px] border-gray-500 p-4 rounded-lg shadow-lg"
            onClick={() => handleCoinClick(item.id)}
          >
            <img src={item.image} alt={`${item.name} logo`} className="w-16 h-16 mb-2" />
            <div className="flex gap-x-2 text-md font-mono">
              <span>{item.symbol.toUpperCase()}</span>
              <span className={item.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {item.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
            <h4 className="flex items-center gap-x-1 text-sm text-center">
              <span>{symbol}</span>
              {new Intl.NumberFormat().format(item.market_cap)}
            </h4>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
