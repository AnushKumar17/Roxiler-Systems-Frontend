import React, { useRef } from 'react';
import TransactionsList from '../src/components/TransactionsList';
import Statistics from '../src/components/Statistics';
import BarChart from '../src/components/BarChart';
import PieChart from '../src/components/PieChart';
import './App.css';
import Footer from './components/Footer';

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
        <Footer/>
      </div>
    </div>
  );
};

export default App;
