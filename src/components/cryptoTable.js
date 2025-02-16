import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from "../context/cryptoContext";
import { useFetchData } from '../hooks/fetchData';
import { coinsList } from "../config/api";
import CryptoLoader from '../components/loader';

export default function CoinsTable() {
  const { symbol, currency } = useCurrency();
  const { data, error, loading } = useFetchData(coinsList(currency));
  const navigate = useNavigate();
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the slice of data to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = Array.isArray(data) ? data.slice(startIndex, endIndex) : [];

  const handleCoinClick = (coinId) => {
    navigate(`/SingleCoinPage/${coinId}`);
  };

  const handleNextPage = () => {
    if (endIndex < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <CryptoLoader />;
  if (error) return <div>Error loading data</div>;

  return (
    <section className="px-[2.3rem] mx-auto w-full md:w-[80%] md:px-4 py-4 mt-10">
      <h2 className='text-yellow-600 text-2xl md:text-3xl font-bold text-center md:text-left'>
        Cryptocurrencies Information By MarketCap:
      </h2>

      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-500">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal">Sr.No</th>
                    <th scope="col" className="px-8 py-3.5 text-left text-sm font-normal">Coin</th>
                    <th scope="col" className="px-12 py-3.5 text-left text-sm font-normal">Price</th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal">24hr Exchange</th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal">MarketCap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-white">
                  {tableData.map((coin, index) => (
                    <tr key={coin.id} onClick={() => handleCoinClick(coin.id)} className='cursor-pointer hover:bg-gray-800'>
                      <td><span className='px-4'>{startIndex + index + 1}</span></td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full object-cover" src={coin.image} alt={coin.name} />
                          <div className="ml-2">
                            <div className="text-sm font-medium text-white">{coin.name}</div>
                            <div className="text-sm">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm text-white">{symbol}{coin.current_price.toFixed(2)}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className={coin.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'}>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        {symbol}{new Intl.NumberFormat().format(coin.market_cap)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-6">
        <button
          className="mx-1 cursor-pointer text-sm font-semibold text-white disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &larr; Previous
        </button>
        <button
          className="mx-2 text-sm font-semibold text-white disabled:opacity-50"
          onClick={handleNextPage}
          disabled={endIndex >= data.length}
        >
          Next &rarr;
        </button>
      </div>
    </section>
  );
}