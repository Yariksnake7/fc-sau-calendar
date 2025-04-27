import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import players from './players';

const FORMATIONS = {
  '4-2-1': [
    { name: 'FW', x: 50, y: 15 },
    { name: 'MF', x: 30, y: 35 },
    { name: 'MF', x: 70, y: 35 },
    { name: 'DF', x: 15, y: 60 },
    { name: 'DF', x: 35, y: 60 },
    { name: 'DF', x: 65, y: 60 },
    { name: 'DF', x: 85, y: 60 },
    { name: 'GK', x: 50, y: 90 },
  ],
  '3-3-1': [
    { name: 'FW', x: 50, y: 15 },
    { name: 'MF', x: 20, y: 38 },
    { name: 'MF', x: 50, y: 38 },
    { name: 'MF', x: 80, y: 38 },
    { name: 'DF', x: 25, y: 65 },
    { name: 'DF', x: 50, y: 65 },
    { name: 'DF', x: 75, y: 65 },
    { name: 'GK', x: 50, y: 90 },
  ],
};

export default function Pitch({ squad, setSquad }) {
  const [formation, setFormation] = useState('4-2-1');
  const [selectedId, setSelectedId] = useState(null);
  const positions = FORMATIONS[formation];
  const fieldPlayers = squad.slice(0, positions.length);
  const fieldIds = fieldPlayers.map(p => p.id);
  const allPlayers = players;
  const subs = allPlayers.filter(p => !fieldIds.includes(p.id));

  function handlePlayerClick(id) {
    if (selectedId === null) {
      setSelectedId(id);
    } else if (selectedId === id) {
      setSelectedId(null);
    } else {
      // swap
      const all = [...fieldPlayers, ...subs];
      const idxA = all.findIndex(p => p.id === selectedId);
      const idxB = all.findIndex(p => p.id === id);
      if (idxA === -1 || idxB === -1) {
        setSelectedId(null);
        return;
      }
      const newAll = [...all];
      [newAll[idxA], newAll[idxB]] = [newAll[idxB], newAll[idxA]];
      setSquad(newAll);
      setSelectedId(null);
    }
  }

  return (
    <div className="pitch-outer">
      <div className="pitch-title">Футбольное поле</div>
      <div className="pitch-container">
        <div className="formation-buttons">
          <button
            className={`formation-btn${formation === '4-2-1' ? ' selected' : ''}`}
            onClick={() => setFormation('4-2-1')}
          >4-2-1</button>
          <button
            className={`formation-btn${formation === '3-3-1' ? ' selected' : ''}`}
            onClick={() => setFormation('3-3-1')}
          >3-3-1</button>
        </div>
        <div className="pitch">
          <div
            style={{
              position: 'relative',
              width: 420,
              height: 660,
              maxWidth: '95vw',
              maxHeight: '70vw',
              background: 'linear-gradient(180deg, #22c55e 0%, #15803d 100%)',
              borderRadius: 32,
              border: '6px solid #fff',
              boxShadow: '0 24px 64px 0 #000a, 0 2px 32px 0 #22c55e55',
              marginBottom: 32,
              overflow: 'hidden',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {/* Центральная линия (горизонтальная) */}
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 3, background: '#fff', opacity: 0.9, transform: 'translateY(-50%)' }} />
            {/* Центральный круг */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 120, height: 120, border: '2px solid #fff', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
            {/* Центр поля */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 16, height: 16, background: '#fff', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
            {/* Верхняя штрафная */}
            <div style={{ position: 'absolute', left: '50%', top: 0, width: 260, height: 70, border: '2px solid #fff', borderTop: 'none', borderRadius: '0 0 32px 32px', transform: 'translateX(-50%)' }} />
            {/* Нижняя штрафная */}
            <div style={{ position: 'absolute', left: '50%', bottom: 0, width: 260, height: 70, border: '2px solid #fff', borderBottom: 'none', borderRadius: '32px 32px 0 0', transform: 'translateX(-50%)' }} />
            {/* Вратарские */}
            <div style={{ position: 'absolute', left: '50%', top: 0, width: 120, height: 32, border: '2px solid #fff', borderTop: 'none', borderRadius: '0 0 16px 16px', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', bottom: 0, width: 120, height: 32, border: '2px solid #fff', borderBottom: 'none', borderRadius: '16px 16px 0 0', transform: 'translateX(-50%)' }} />
            {/* Игроки на поле */}
            {positions.map((pos, idx) => {
              const player = fieldPlayers[idx];
              if (!player) return null;
              return (
                <div
                  key={player.id}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 2,
                    textAlign: 'center',
                  }}
                  onClick={() => handlePlayerClick(player.id)}
                >
                  <PlayerCard player={player} showOnlyLastName selected={selectedId === player.id} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="subs-title">Запасные</div>
        <div className="subs-row">
          {subs.map(player => (
            <div
              key={player.id}
              style={{ position: 'static', cursor: 'pointer' }}
              onClick={() => handlePlayerClick(player.id)}
            >
              <PlayerCard player={player} showOnlyLastName selected={selectedId === player.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 