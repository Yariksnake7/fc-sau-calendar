import React, { useState } from 'react';
import players from './players.jsx';
import './PlayersList.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';

const POSITIONS = [
  { key: 'Вратарь', label: 'Вратари' },
  { key: 'Защитник', label: 'Защитники' },
  { key: 'Полузащитник', label: 'Полузащитники' },
  { key: 'Нападающий', label: 'Нападающие' },
];

function PlayerCardWithStats({ player }) {
  const [showStats, setShowStats] = useState(false);
  return (
    <div
      className="player-card modern-card player-slider-card"
      onMouseEnter={() => setShowStats(true)}
      onMouseLeave={() => setShowStats(false)}
      onTouchStart={() => setShowStats(v => !v)}
      style={{ position: 'relative' }}
    >
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
      {showStats && (
        <div className="player-stats-tooltip">
          <div className="stats-title">Статистика</div>
          <div className="stats-list">
            <div className="stat-item"><span>Матчи:</span> <b>—</b></div>
            <div className="stat-item"><span>Голы:</span> <b>—</b></div>
            <div className="stat-item"><span>Передачи:</span> <b>—</b></div>
            <div className="stat-item"><span>ЖК:</span> <b>—</b></div>
            <div className="stat-item"><span>КК:</span> <b>—</b></div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlayerSlider({ players }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={32}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        1200: { slidesPerView: 3 },
        900: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
      }}
      style={{ padding: '24px 0' }}
    >
      {players.map(player => (
        <SwiperSlide key={player.id}>
          <PlayerCardWithStats player={player} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function PlayersList() {
  return (
    <div className="players-list-container">
      {POSITIONS.map(pos => {
        const filtered = players.filter(p => p.position === pos.key);
        if (!filtered.length) return null;
        return (
          <div className="player-section" key={pos.key}>
            <h2 className="section-title">{pos.label}</h2>
            <PlayerSlider players={filtered} />
          </div>
        );
      })}
    </div>
  );
}

export default PlayersList; 