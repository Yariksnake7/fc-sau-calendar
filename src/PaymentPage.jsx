import React, { useState, useEffect } from 'react';
import './PaymentPage.css';

const PaymentPage = ({ user }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Проверка на администратора
    const checkAdmin = () => {
      // Только Малахов (ID: 5) и Семибратов (ID: 6) являются администраторами
      const adminIds = [5, 6];
      setIsAdmin(adminIds.includes(user.playerId));
    };

    checkAdmin();

    // Создание QR-кода через ЮKassa
    const createPaymentQR = async () => {
      try {
        const amount = localStorage.getItem('paymentAmount') || '0';
        const response = await fetch('https://api.yookassa.ru/v3/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': Date.now().toString(),
            'Authorization': 'Basic ' + btoa('YOUR_SHOP_ID:YOUR_SECRET_KEY')
          },
          body: JSON.stringify({
            amount: {
              value: amount,
              currency: 'RUB'
            },
            confirmation: {
              type: 'qr',
              return_url: window.location.origin
            },
            capture: true,
            description: 'Оплата матча'
          })
        });

        const data = await response.json();
        if (data.confirmation && data.confirmation.confirmation_url) {
          setQrCodeUrl(data.confirmation.confirmation_url);
        }
      } catch (error) {
        console.error('Ошибка при создании QR-кода:', error);
      }
    };

    createPaymentQR();
  }, [user]);

  const handleAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Сохранение суммы оплаты
    localStorage.setItem('paymentAmount', paymentAmount);
    
    // Добавление уведомления
    const newNotification = {
      id: Date.now(),
      message: `Новая сумма оплаты: ${paymentAmount} ₽`,
      timestamp: new Date().toLocaleString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Очистка поля ввода
    setPaymentAmount('');
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Оплата матча</h1>
      
      <div className="match-info">
        <h2>Информация о матче</h2>
        <p>Дата: {matchDate}</p>
        <p>Время: {matchTime}</p>
      </div>

      <div className="payment-details">
        <h2>Сумма к оплате</h2>
        <p className="amount">{localStorage.getItem('paymentAmount') || '0'} ₽</p>
      </div>

      <div className="qr-section">
        <h2>Оплата по СБП</h2>
        <div className="qr-container">
          {qrCodeUrl ? (
            <img 
              src={qrCodeUrl}
              alt="QR код для оплаты" 
              className="qr-code" 
            />
          ) : (
            <div className="qr-loading">Загрузка QR-кода...</div>
          )}
          <p className="phone-number">89167236241</p>
          <p className="payment-instructions">
            Отсканируйте QR-код для перехода к оплате. Выберите ваш банк в открывшемся окне.
          </p>
        </div>
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Управление суммой оплаты</h2>
          <div className="form-group">
            <label htmlFor="amount">Сумма оплаты:</label>
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

      {isAdmin && notifications.length > 0 && (
        <div className="notifications">
          <h2>Уведомления</h2>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <p>{notification.message}</p>
                <small>{notification.timestamp}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 