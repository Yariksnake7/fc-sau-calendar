import React from 'react';
import players from './players.jsx';
import './PlayersList.css';

const PlayersList = () => (
  <div className="players-list">
    {players.map(player => (
      <div className="player-card modern-card" key={player.id}>
        <span className="player-bg-number">{player.number}</span>
        <img
          src={player.photo}
          alt={player.lastName}
          className="player-photo"
          onError={e => { e.target.src = '/players/default.png'; }}
        />
        <div className="player-info">
          <div className="player-name">{player.firstName} {player.lastName}</div>
          <div className="player-position">{player.position}</div>
        </div>
      </div>
    ))}
  </div>
);

export default PlayersList; 