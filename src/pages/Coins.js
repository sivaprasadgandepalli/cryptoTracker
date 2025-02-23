import React, { useState } from 'react';
import { useFetchData } from '../hooks/fetchData';
import { coinsList } from '../config/api';
import { useCurrency } from '../context/cryptoContext';
import CryptoLoader from '../components/loader';
import { useNavigate } from 'react-router-dom';
import { FaList, FaThLarge } from 'react-icons/fa';

export default function Coins() {
  const { currency, symbol } = useCurrency();
  const { data, error, loading } = useFetchData(coinsList(currency));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewType, setViewType] = useState('grid');
  const [displayCount, setDisplayCount] = useState(20);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleCoinClick = (coinId) => {
    navigate(`/Coin/${coinId}`,);
  };

  const filteredCoins = data?.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch(selectedFilter) {
      case 'top10':
        return matchesSearch && coin.market_cap_rank <= 10;
      case 'gainers':
        return matchesSearch && coin.price_change_percentage_24h > 0;
      case 'losers':
        return matchesSearch && coin.price_change_percentage_24h < 0;
      default:
        return matchesSearch;
    }
  }) || [];

  // Pagination logic
  const totalCoins = filteredCoins.length;
  const totalPages = Math.ceil(totalCoins / 20);
  const paginatedCoins = filteredCoins.slice((page - 1) * 20, page * 20);

  if (loading) return <CryptoLoader />;
  if (error) return <div className="w-full flex items-center justify-center min-h-screen">
      <p>Error loading data. Please try again.</p>
    </div>;

  return (
    <div className="w-full md:w-[88%] px-2 mx-auto mt-10 min-h-screen">
      {/* Controls Section */}
      <div className="flex flex-wrap md:flex-nowrap md:flex-row gap-2 mb-8 p-3 bg-gray-900 rounded-lg">
        <input
          type="text"
          placeholder="Search coins..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 rounded-lg bg-slate-800 text-white flex-grow md:flex-grow-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Coins</option>
          <option value="top10">Top 10 by Market Cap</option>
          <option value="gainers">24h Gainers</option>
          <option value="losers">24h Losers</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Coins Grid/List */}
      <div className={`${viewType === 'grid' ? 
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 
        'space-y-4'}`}
      >
        {paginatedCoins.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCoinClick(item.id)}
            className={`group cursor-pointer bg-slate-900 p-4 rounded-xl transition-all hover:bg-gray-800 hover:transform hover:scale-105 ${
              viewType === 'list' ? 'flex items-center justify-between' : 'flex flex-col items-center'
            }`}
          >
            <div className={`${viewType === 'list' ? 'flex items-center gap-4' : 'text-center flex flex-col items-center justify-center'}`}>
              <img 
                src={item.image} 
                alt={`${item.name} logo`} 
                className="w-12 h-12 mb-2"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  {item.name} ({item.symbol.toUpperCase()})
                </h3>
                {viewType === 'list' && (
                  <p className="text-sm text-gray-400">
                    Rank: #{item.market_cap_rank}
                  </p>
                )}
              </div>
            </div>

            <div className={`${viewType === 'list' ? 'text-right' : 'text-center'}`}>
              <p className="text-sm text-gray-300">
                {symbol}{item.current_price?.toLocaleString()}
              </p>
              <p className={`text-sm ${
                item.price_change_percentage_24h > 0 ? 
                'text-emerald-400' : 'text-red-400'
              }`}>
                {item.price_change_percentage_24h?.toFixed(2)}%
              </p>
              {viewType === 'list' && (
                <p className="text-sm text-gray-400">
                  Market Cap: {symbol}{item.market_cap?.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {page > 1 && (
          <button 
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => setPage(page - 1)}
          >
            Previous Page
          </button>
        )}
        
        {page < totalPages && (
          <button 
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
        )}
      </div>

      {paginatedCoins.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No coins found matching your criteria
        </div>
      )}
    </div>
  );
}
