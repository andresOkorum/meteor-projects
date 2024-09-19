import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'meteor/quave:alert-react-tailwind';
import { ErrorAlert } from './components/ErrorAlert';
import { RoutePaths } from './RoutePaths';

export const RemoveTransaction = () => {
  const { openAlert } = useAlert();
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState();

  const removeTransaction = (e) => {
    e.preventDefault();
    Meteor.call('transactions.remove', transactionId, (err) => {
      if (err) {
        console.error('Error trying to remove a transaction', err);
        setError(err);
        return;
      }
      setTransactionId('');
      setError(null);
      openAlert('The transaction was removed succesfully');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">
        Remove Transaction
      </h3>
      {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
      <form className="mt-6 flex flex-col">
        <div className="flex flex-col space-y-4">
          <div className="">
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            onClick={() => navigate(RoutePaths.HOME)}
            className="border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Back to Home
          </button>
          <button
            onClick={removeTransaction}
            type="submit"
            className="ml-3 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
