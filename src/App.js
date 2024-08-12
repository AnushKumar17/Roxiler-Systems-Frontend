import React, { useRef } from 'react';
import TransactionsList from './TransactionsList';
import Statistics from './Statistics';
import BarChart from './BarChart';
import PieChart from './PieChart';
import './App.css';

const App = () => {
  const statisticsRef = useRef(null);

  const scrollToStatistics = () => {
    statisticsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <h1 className='text-blue-600 text-6xl font-bold p-5 flex items-center justify-center'>Transaction Dashboard</h1>
      <span onClick={scrollToStatistics} className="cursor-pointer flex items-center justify-center underline text-gray-500">Click here to directly go to Statistics and Charts</span>
      <TransactionsList />
      <div id="statistics" ref={statisticsRef}>
        <Statistics/>
      </div>
      <div className="charts-container">
        <div className="chart-size ">
          <BarChart />
        </div>
        <div className="chart-size">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default App;
