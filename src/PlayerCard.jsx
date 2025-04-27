import React from 'react';
import './PlayerCard.css';

function PlayerCard({ player, style, showOnlyLastName, ...props }) {
  return (
    <div className="player-card" style={style} {...props}>
      <img className="player-photo" src={player.photo} alt={player.lastName} />
      <div className="player-info">
        <span className="player-number">{player.number}</span>
        <span className="player-name">
          {showOnlyLastName ? player.lastName : player.firstName + ' ' + player.lastName}
        </span>
      </div>
    </div>
  );
}

export default PlayerCard; 