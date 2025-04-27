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
              <button className="btn" onClick={() => setPage('payment')}>Оплата матча</button>
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
          {page === 'payment' && (
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