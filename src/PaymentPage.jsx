import React, { useState, useEffect } from 'react';
import './PaymentPage.css';

const ADMIN_IDS = [5, 6];

const PaymentPage = ({ user }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setIsAdmin(ADMIN_IDS.includes(user.playerId));
  }, [user]);

  const handleAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentAmount', paymentAmount);
    const newNotification = {
      id: Date.now(),
      message: `Новая сумма оплаты: ${paymentAmount} ₽`,
      timestamp: new Date().toLocaleString()
    };
    setNotifications(prev => [newNotification, ...prev]);
    setPaymentAmount('');
  };

  // Если болельщик — ничего не показываем
  if (user.role === 'fan') return null;

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="bank-info">
          <div className="bank-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Sberbank_Logo_2020.svg" alt="Сбербанк" />
          </div>
          <div className="bank-details">
            <div className="bank-label">Сбербанк</div>
            <div className="bank-phone">8 916 723 62 41</div>
          </div>
        </div>
        <div className="amount-block">
          <div className="amount-label">Сумма к оплате</div>
          <div className="amount-value">{localStorage.getItem('paymentAmount') || '0'} ₽</div>
        </div>
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Изменить сумму оплаты</h2>
          <div className="form-group">
            <label htmlFor="amount">Сумма:</label>
            <input
              type="number"
              id="amount"
              value={paymentAmount}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
              required
            />
          </div>
          <button type="submit" className="btn">Сохранить</button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage; 