import React from 'react';
import players from './players.jsx';
import './PlayersList.css';

function PlayersList() {
  const goalkeepers = players.filter(player => player.position === "Вратарь");
  const defenders = players.filter(player => player.position === "Защитник");
  const midfielders = players.filter(player => player.position === "Полузащитник");
  const forwards = players.filter(player => player.position === "Нападающий");

  const PlayerSection = ({ title, players }) => (
    <div className="player-section">
      <h2 className="section-title">{title}</h2>
      <div className="players-grid">
        {players.map(player => (
          <div key={player.id} className="player-card modern-card">
            <div className="player-bg-number">{player.number}</div>
            <img
              src={player.photo}
              alt={`${player.firstName} ${player.lastName}`}
              className="player-photo"
              onError={e => { e.target.src = '/players/default.png'; }}
            />
            <div className="player-info">
              <div className="player-name">{player.firstName} {player.lastName}</div>
              <div className="player-number">#{player.number}</div>
              <div className="player-position">{player.position}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="players-list-container">
      <PlayerSection title="Вратари" players={goalkeepers} />
      <PlayerSection title="Защитники" players={defenders} />
      <PlayerSection title="Полузащитники" players={midfielders} />
      <PlayerSection title="Нападающие" players={forwards} />
    </div>
  );
}

export default PlayersList; 