import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export default function CalendarPage({ user }) {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const users = getUsers();
        if (users[user.username]) {
            setDates(users[user.username].dates || []);
        } else {
            // Создаем запись для нового пользователя
            users[user.username] = { dates: [] };
            setUsers(users);
        }
    }, [user.username]);

    const handleDateClick = (date) => {
        const dateStr = date.toISOString().slice(0, 10);
        let newDates;
        if (dates.includes(dateStr)) {
            newDates = dates.filter(d => d !== dateStr);
        } else {
            newDates = [...dates, dateStr];
        }
        setDates(newDates);
        const users = getUsers();
        users[user.username].dates = newDates;
        setUsers(users);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().slice(0, 10);
            if (dates.includes(dateStr)) {
                return 'selected-date';
            }
        }
        return null;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>Рабочие даты: {user.username}</h2>
            </div>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
            />
            <div className="selected-dates">
                <h3>Отмеченные даты:</h3>
                <ul>
                    {dates.sort().map(d => <li key={d}>{d}</li>)}
                </ul>
            </div>
        </div>
    );
}