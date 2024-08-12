import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/transactions', {
          params: { search, page: currentPage, per_page: 10 }
        });
        setTransactions(response.data.transactions);
        setTotalPages(Math.ceil(response.data.total / 10)); // Calculate total pages
      } catch (err) {
        setError('Failed to fetch transactions');
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [search, currentPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }

  };

  return (
    <div>
      <h1 className='font-bold text-4xl underline py-4 flex items-center justify-center'>Product Transactions</h1>

      <div class="relative h-11 w-full min-w-[200px] my-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
        <label
          class="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Search...
        </label>
      </div>

      {loading && <div class="flex gap-2 my-4">
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>}
      {error && <p>{error}</p>}
      {!loading && !error && (

        <div className="p-6 rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 border-b border-gray-300">
                  <th className="p-3 text-left text-gray-700 border-r border-gray-300">ID</th>
                  <th className="p-3 text-left text-gray-700 border-r border-gray-300">Title</th>
                  <th className="p-3 text-left text-gray-700 border-r border-gray-300">Price</th>
                  <th className="p-3 text-left text-gray-700 border-r border-gray-300">Description</th>
                  <th className="p-3 text-left text-gray-700 border-r border-gray-300">Sold</th>
                  <th className="p-3 text-left text-gray-700">Date of Sale</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 border-b border-gray-300">
                    <td className="p-3 text-gray-800 border-r border-gray-300">{transaction.id}</td>
                    <td className="p-3 text-gray-800 border-r border-gray-300">{transaction.title}</td>
                    <td className="p-3 text-gray-800 border-r border-gray-300">${transaction.price}</td>
                    <td className="p-3 text-gray-800 border-r border-gray-300">{transaction.description}</td>
                    <td className="p-3 text-gray-800 border-r border-gray-300">{transaction.sold ? 'Yes' : 'No'}</td>
                    <td className="p-3 text-gray-800">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => {
                handlePageChange(currentPage - 1);
                window.scrollTo({ top: 150, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => {
                handlePageChange(currentPage + 1);
                window.scrollTo({ top: 150, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>



      )}
    </div>
  );
};

export default TransactionsList;
