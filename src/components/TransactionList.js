import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className='transaction-list'>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.id} class='transaction'>
            <p className='item'>
              {transaction.item} <strong>${transaction.amount}</strong>
            </p>

            <small>{new Date(transaction.date).toDateString()}</small>
          </div>
        ))}
    </div>
  );
};

export default TransactionList;
