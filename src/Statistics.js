import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [month, setMonth] = useState('March');
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/statistics', {
        params: { month }
      });
      setStatistics(response.data);
    } catch (err) {
      setError('Failed to fetch statistics');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatistics();
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div className='container mx-auto p-8'>
      <h1 className='font-bold text-4xl underline py-4 text-center'>Statistics</h1>
      <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4">
        <select
          className='bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          {months.map((monthName) => (
            <option key={monthName} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
      </form>

      {loading && <div class="flex gap-2 my-4">
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>}
      {error && <p className='text-center mt-4'>{error}</p>}
      {statistics && (
        <div className='text-center mt-4'>
          <h3 className='font-semibold text-lg py-2'>Statistics for {statistics.month}</h3>
          <p className='text-gray-600'>Total Sale Amount : <span className='text-blue-600'>${statistics.totalSaleAmount.toFixed(2)}</span></p>
          <p className='text-gray-600'>Total Sold Items : <span className='text-blue-600'>{statistics.totalSoldItems}</span></p>
          <p className='text-gray-600'>Total Not Sold Items : <span className='text-blue-600'>{statistics.totalNotSoldItems}</span></p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
