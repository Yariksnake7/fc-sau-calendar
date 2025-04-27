import React, { useState, useEffect } from 'react';
import players from './players';

const ATTENDANCE_KEY = 'attendance';

function getAttendance() {
  return JSON.parse(localStorage.getItem(ATTENDANCE_KEY)) || {};
}
function setAttendance(data) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(data));
}

export default function PlayerAttendance({ user }) {
  const playerId = user.playerId;
  const [attendance, setAttendanceState] = useState(getAttendance());
  const [sat, setSat] = useState(attendance[playerId]?.sat || false);
  const [sun, setSun] = useState(attendance[playerId]?.sun || false);
  const [pendingSat, setPendingSat] = useState(sat);
  const [pendingSun, setPendingSun] = useState(sun);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setSat(attendance[playerId]?.sat || false);
    setSun(attendance[playerId]?.sun || false);
    setPendingSat(attendance[playerId]?.sat || false);
    setPendingSun(attendance[playerId]?.sun || false);
    setSaved(true);
  }, [playerId, attendance]);

  const handleChange = (day) => {
    setSaved(false);
    if (day === 'sat') {
      setPendingSat(!pendingSat);
    } else {
      setPendingSun(!pendingSun);
    }
  };

  const handleSave = () => {
    const newAttendance = { ...attendance };
    newAttendance[playerId] = { sat: pendingSat, sun: pendingSun };
    setAttendanceState(newAttendance);
    setAttendance(newAttendance);
    setSat(pendingSat);
    setSun(pendingSun);
    setSaved(true);
  };

  // Список всех отметившихся
  const allAttendance = Object.entries(attendance).map(([id, days]) => {
    const p = players.find(pl => pl.id === Number(id));
    return p ? { ...p, ...days } : null;
  }).filter(Boolean);

  return (
    <div style={{background:'#222', borderRadius:12, padding:24, margin:'32px 0', color:'#fff', maxWidth:500}}>
      <h2>Моё участие</h2>
      <div style={{display:'flex', gap:24, justifyContent:'center', margin:'16px 0'}}>
        <button
          type="button"
          className={pendingSat ? 'oval-btn selected' : 'oval-btn'}
          onClick={() => handleChange('sat')}
        >
          Суббота
        </button>
        <button
          type="button"
          className={pendingSun ? 'oval-btn selected' : 'oval-btn'}
          onClick={() => handleChange('sun')}
        >
          Воскресенье
        </button>
      </div>
      <button className="btn" style={{marginTop:12, marginBottom:24}} onClick={handleSave} disabled={saved}>
        Сохранить
      </button>
      <h3 style={{marginTop:24}}>Кто когда может играть:</h3>
      <table style={{width:'100%', color:'#fff', background:'#181818', borderRadius:8, marginTop:12}}>
        <thead>
          <tr>
            <th style={{padding:8}}>Игрок</th>
            <th>Суббота</th>
            <th>Воскресенье</th>
          </tr>
        </thead>
        <tbody>
          {allAttendance.map(p => (
            <tr key={p.id}>
              <td style={{padding:8}}>{p.firstName} {p.lastName}</td>
              <td style={{textAlign:'center'}}>{p.sat ? '✅' : ''}</td>
              <td style={{textAlign:'center'}}>{p.sun ? '✅' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 