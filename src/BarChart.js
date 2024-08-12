import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState('March');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchBarChartData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/bar-chart', {
        params: { month }
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch bar chart data');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBarChartData();
  };

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const chartData = {
    labels: data ? data.map(item => item.range) : [],
    datasets: [
      {
        label: 'Number of Items',
        data: data ? data.map(item => item.count) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className=''>
      <h1 className='font-bold text-4xl underline py-4'>Bar Chart</h1>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <select
        className='my-2 bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
      {error && <p>{error}</p>}
      {data && (
        <div className="chart-size">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Allow chart to resize within its container
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Number of Items by Price Range'
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarChart;
