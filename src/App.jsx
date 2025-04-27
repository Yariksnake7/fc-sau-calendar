import React, { useState } from 'react';
import './App.css';
import CalendarPage from './CalendarPage.jsx';
import PlayersList from './PlayersList.jsx';
import Login from './Login.jsx';
import PlayerAttendance from './PlayerAttendance.jsx';
import Pitch from './Pitch.jsx';
import PaymentPage from './PaymentPage.jsx';
import players from './players.jsx';

function FieldPage({ user }) {
  const [squad, setSquad] = React.useState(() => {
    const saved = localStorage.getItem('savedSquad');
    return saved ? JSON.parse(saved) : players.slice(0, 11);
  });
  const [saved, setSaved] = React.useState(false);

  function handleSave() {
    localStorage.setItem('savedSquad', JSON.stringify(squad));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div style={{color: '#fff', textAlign: 'center', marginTop: 40}}>
      <Pitch squad={squad} setSquad={setSquad} />
      {user.role === 'coach' && (
        <button className="btn" style={{marginTop: 24, fontSize: 18}} onClick={handleSave}>
          Сохранить состав
        </button>
      )}
      {saved && <div style={{color:'#e30613', marginTop:8}}>Состав сохранён!</div>}
    </div>
  );
}

function App() {
  const [page, setPage] = useState('players');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [carModal, setCarModal] = useState(false);
  const [carResult, setCarResult] = useState(null);

  const handleLogin = (userObj) => {
    setUser(userObj);
    localStorage.setItem('currentUser', JSON.stringify(userObj));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <div className="corner-buttons">
        <a 
          href="https://t.me/saulutshevsex" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="telegram-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.95 1.24-5.5 3.65-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.49.8-.75 3.12-1.36 5.2-2.26 6.24-2.7 2.98-1.24 3.6-1.46 4.01-1.46.09 0 .29.02.42.12.11.08.14.19.15.27-.01.06.01.24 0 .38z"/>
          </svg>
          Мы в Telegram
        </a>
      </div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <img 
              src="https://6ff87ac8-1c01-4a5d-8145-f60a24de5ae8.selcdn.net/api/img/logos/SAU-min.png?logoId=undefined" 
              alt="Spartak Moscow Logo" 
              className="logo"
            />
            <h1>FC SAU</h1>
            <nav style={{marginLeft: 'auto', display: 'flex', gap: 16}}>
              <button className="btn" onClick={() => setPage('players')}>Список игроков</button>
              <button className="btn" onClick={() => setPage('field')}>Футбольное поле</button>
              <button className="btn" onClick={() => setPage('participation')}>Участие в игре</button>
              {user.role !== 'fan' && (
                <button className="btn" onClick={() => setPage('payment')}>Оплата матча</button>
              )}
              <button className="btn" style={{background:'#333', color:'#fff', border:'1px solid #e30613'}} onClick={() => { setUser(null); localStorage.removeItem('currentUser'); }}>Выйти</button>
              <div className="car-banner" onClick={() => { setCarModal(true); setCarResult(null); }} title="Поехать на матч со Стёпой на машине">
                <img src="/car.png" alt="car" />
              </div>
            </nav>
          </div>
        </div>
      </header>
      {carModal && (
        <div className="car-modal-backdrop">
          <div className="car-modal">
            {!carResult && <>
              <div style={{marginBottom: 12}}>Вы хотите поехать на матч со Стёпой на машине?</div>
              <div className="car-modal-btns">
                <button onClick={() => setCarResult('no')}>Нет</button>
                <button onClick={() => setCarResult('yes')}>Да</button>
              </div>
            </>}
            {carResult === 'no' && <div style={{marginTop: 8}}>Может в следующий раз!</div>}
            {carResult === 'yes' && <div style={{marginTop: 8}}>Извините, все места в машине заняты</div>}
            <button style={{marginTop: 18, background:'#333'}} onClick={() => setCarModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
      <main className="main">
        <div className="container">
          {page === 'players' && <PlayersList />}
          {page === 'field' && (
            <div className="pitch-outer">
              <div className="title">Управление составом</div>
              <FieldPage user={user} />
            </div>
          )}
          {page === 'participation' && (
            <div className="participation-outer">
              <div className="title">Участие в игре</div>
              <PlayerAttendance user={user} />
            </div>
          )}
          {page === 'payment' && user.role !== 'fan' && (
            <div className="payment-outer">
              <PaymentPage user={user} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;