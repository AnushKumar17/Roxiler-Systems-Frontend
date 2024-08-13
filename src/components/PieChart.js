import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const PieChart = () => {
  const [month, setMonth] = useState('March');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchPieChartData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://app-backend-liard.vercel.app/pie-chart', {
        params: { month }
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch pie chart data');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPieChartData();
  };

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const chartData = {
    labels: data ? data.map(item => item.category) : [],
    datasets: [
      {
        label: 'Number of Items',
        data: data ? data.map(item => item.count) : [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1 className='font-bold text-4xl underline py-4'>Pie Chart</h1>
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
          <Pie
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
                  text: 'Items by Category'
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PieChart;
