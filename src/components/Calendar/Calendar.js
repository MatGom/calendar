import { useAppContext } from '../../context/AppContext';
import './Calendar.css';
import { monthNames, daysOfWeek } from '../../data/calendar-data';

const Calendar = () => {
  const { currentMonth, currentYear, prevMonth, nextMonth, selectedDay, setSelectedDay, todayFormatted, notes } =
    useAppContext();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonthDaysToShow = adjustedFirstDay;
  const nextMonthDaysToShow = 6 * 7 - daysInMonth - prevMonthDaysToShow;

  const prevMonthDays = Array.from({ length: prevMonthDaysToShow }, (_, i) => {
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const month = currentMonth === 0 ? 11 : currentMonth - 1;
    const day = new Date(year, month + 1, 0).getDate() - prevMonthDaysToShow + i + 1;
    return { day, month, year };
  });

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
    return { day: i + 1, month: currentMonth, year: currentYear };
  });

  const nextMonthDays = Array.from({ length: nextMonthDaysToShow }, (_, i) => {
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const month = currentMonth === 11 ? 0 : currentMonth + 1;
    return { day: i + 1, month, year };
  });

  const daysArray = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

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
          {daysArray.map((date, index) => {
            const formattedDate = `${date.year}-${date.month + 1}-${date.day}`;
            const isSelected = formattedDate === selectedDay;
            const isToday = formattedDate === todayFormatted;
            const isCurrentMonth = date.month === currentMonth;
            const hasNote = notes[formattedDate];

            return (
              <div
                key={index}
                className={`day ${isCurrentMonth ? '' : 'not-current-month'} ${isSelected ? 'selected' : ''} ${
                  isToday ? 'today' : ''
                }`}
                onClick={() => setSelectedDay(formattedDate)}>
                <div>{date.day}</div>
                {hasNote && <span>+</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
