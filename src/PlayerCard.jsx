import React from 'react';
import './PlayerCard.css';

function PlayerCard({ player, style, showOnlyLastName, selected, ...props }) {
  return (
    <div className={`player-card${selected ? ' selected' : ''}`} style={style} {...props}>
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