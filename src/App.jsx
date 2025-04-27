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
        <a 
          href="https://afl.co.th/football/afl-moscow-8x8/euroleague-%22d%22-3477/teams/fc-sau" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="afl-btn"
        >
          <svg viewBox="0 0 100 100" width="18" height="18" style={{marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M50 5c-8.5 0-16.7.4-24.6 1.2-3.2.3-6.1 2.1-8 4.8C7.7 22.2 2.2 36.2.5 44.2c-1.7 8-1.7 13.6-1.7 13.6 0 4.2 1.7 8.2 4.8 11.1 7.7 7.1 36.2 29.6 44.2 34.2 8 4.6 13.6 4.6 13.6 4.6s5.6 0 13.6-4.6c8-4.6 36.5-27.1 44.2-34.2 3.1-2.9 4.8-6.9 4.8-11.1 0 0 0-5.6-1.7-13.6-1.7-8-7.2-22-16.9-33.2-1.9-2.7-4.8-4.5-8-4.8C66.7 5.4 58.5 5 50 5z" fill="#fff"/>
              <text x="50" y="40" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1a237e" fontFamily="Arial, Helvetica, sans-serif">AFL</text>
              <circle cx="50" cy="70" r="14" fill="#fff" stroke="#1a237e" strokeWidth="3" />
              <polygon points="50,60 54,68 46,68" fill="#1a237e" />
              <polygon points="50,80 54,72 46,72" fill="#1a237e" />
              <polygon points="60,70 52,74 52,66" fill="#1a237e" />
              <polygon points="40,70 48,74 48,66" fill="#1a237e" />
            </g>
          </svg>
          Мы в AFL
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
            </nav>
          </div>
        </div>
      </header>
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