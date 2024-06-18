"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './page.css';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const total = parseFloat(searchParams.get('total') || '0');

  const [amountPaid, setAmountPaid] = useState('');
  const [change, setChange] = useState(0);

  useEffect(() => {
    const paid = parseFloat(amountPaid || '0');
    setChange(paid - total);
  }, [amountPaid, total]);

  const handleAmountClick = (value: string) => {
    setAmountPaid((prev) => prev + value);
  };

  const handleDelete = () => {
    setAmountPaid('');
  };

  const handleSubmit = () => {
    // Handle the payment logic here
    alert('Payment Submitted');
  };

  return (
    <div className="payment-page">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">
          Retour
        </button>
        <h1>Paiement</h1>
      </div>
      <div className="payment-container">
        <div className="payment-methods">
          <button className="payment-method selected">Cash</button>
          <button className="payment-method" disabled>Bank</button>
          <button className="payment-method" disabled>Customer Account</button>
          <div className="summary">
            <h2>Résumé</h2>
            <div className="summary-item">
              <span>Cash</span>
              <span>{parseFloat(amountPaid).toLocaleString()} DT</span>
              <button className="delete-button" onClick={handleDelete}>✖</button>
            </div>
          </div>
        </div>
        <div className="payment-details">
          <div className="payment-info">
            <p>Restant: 0,000 DT</p>
            <p>Monnaie: {change.toLocaleString()} DT</p>
            <p>Montant dû: {total.toLocaleString()} DT</p>
          </div>
          <div className="keypad">
            {[1, 2, 3, '+10', 4, 5, 6, '+20', 7, 8, 9, '+50', '+/-', 0, ',', '✖'].map((key, index) => (
              <button
                key={index}
                className="keypad-button"
                onClick={() => {
                  if (key === '✖') {
                    handleDelete();
                  } else if (typeof key === 'string' && key.startsWith('+')) {
                    handleAmountClick((parseFloat(key.slice(1)).toString()));
                  } else {
                    handleAmountClick(key.toString());
                  }
                }}
              >
                {key}
              </button>
            ))}
          </div>
          <button className="validate-button" onClick={handleSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
