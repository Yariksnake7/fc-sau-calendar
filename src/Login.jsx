import React, { useState } from 'react';
import players from './players.jsx';
import './Login.css';

const roles = [
  { key: 'player', label: 'Я игрок' },
  { key: 'fan', label: 'Я болельщик' },
  { key: 'coach', label: 'Я тренер' },
];

const coachPlayersIds = [12, 19, 5, 6]; // Афонин Клим, Меркулов Дмитрий, Малахов Ярослав, Семибратов Пётр

export default function Login({ onLogin }) {
  const [role, setRole] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (role === 'player' || role === 'coach') {
      if (!selectedPlayer) return;
      const player = players.find(p => p.id === selectedPlayer);
      if (!player || player.pin !== pin) {
        setError('Неверный PIN-код');
        return;
      }
      onLogin({ role, playerId: selectedPlayer });
    } else {
      onLogin({ role });
    }
  };

  let filteredPlayers = players;
  if (role === 'coach') {
    filteredPlayers = players.filter(p => coachPlayersIds.includes(p.id));
  }

  return (
    <div className="login-container">
      <h2>Выберите свою роль</h2>
      <div className="role-buttons">
        {roles.map(r => (
          <button
            key={r.key}
            className={`btn role-btn${role === r.key ? ' selected' : ''}`}
            onClick={() => { setRole(r.key); setError(''); setSelectedPlayer(null); setPin(''); }}
          >
            {r.label}
          </button>
        ))}
      </div>
      {(role === 'player' || role === 'coach') && (
        <div className="player-select">
          <h3>Выберите себя из списка</h3>
          <div className="players-list login-list">
            {filteredPlayers.map(player => (
              <div
                key={player.id}
                className={`player-card login-card${selectedPlayer === player.id ? ' selected' : ''}`}
                onClick={() => { setSelectedPlayer(player.id); setError(''); }}
              >
                <img src={player.photo} alt={player.lastName} className="player-photo" />
                <div className="player-info">
                  <div className="player-number">#{player.number}</div>
                  <div className="player-name">{player.firstName} {player.lastName}</div>
                  <div className="player-position">{player.position}</div>
                </div>
              </div>
            ))}
          </div>
          {selectedPlayer && (
            <div style={{ marginTop: 20 }}>
              <input
                type="password"
                placeholder="Введите PIN-код"
                value={pin}
                onChange={e => { setPin(e.target.value); setError(''); }}
                maxLength={4}
                style={{ padding: 10, fontSize: 18, borderRadius: 6, border: '1px solid #ccc', width: 180, textAlign: 'center' }}
              />
            </div>
          )}
        </div>
      )}
      {error && <div style={{ color: 'red', margin: '12px 0' }}>{error}</div>}
      <button className="btn login-btn" onClick={handleLogin} disabled={role === null || ((role === 'player' || role === 'coach') && (!selectedPlayer || pin.length !== 4))}>
        Войти
      </button>
    </div>
  );
}