import { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth + adjustedFirstDay }, (_, index) => {
    return index >= adjustedFirstDay ? index - adjustedFirstDay + 1 : null;
  });

  const prevMonth = () => {
    setCurrentMonth(prevCurrentMonth => {
      let newMonth = prevCurrentMonth - 1;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear = currentYear - 1;
        setCurrentYear(newYear);
      }

      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prevCurrentMonth => {
      let newMonth = prevCurrentMonth + 1;
      let newYear = currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear = currentYear + 1;
        setCurrentYear(newYear);
      }

      return newMonth;
    });
  };

  return (
    <div className='calendar'>
      <div className='calendar-navigation'>
        <button onClick={prevMonth}>&lt; Prev</button>
        <h2 className='calendar-date'>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <button onClick={nextMonth}>Next &gt;</button>
      </div>
      <div className='calendar-grid'>
        <div className='weekdays'>
          {daysOfWeek.map(day => (
            <div className='weekday' key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className='days'>
          {daysArray.map((day, index) => (
            <div key={index} className='day'>
              {day ? <div>{day}</div> : <div>&nbsp;</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
