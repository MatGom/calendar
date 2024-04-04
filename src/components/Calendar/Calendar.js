import { useAppContext } from '../../context/AppContext';
import './Calendar.css';
import { monthNames, daysOfWeek } from '../../data/calendar-data';

const Calendar = () => {
  const { currentMonth, currentYear, prevMonth, nextMonth, selectedDay, setSelectedDay } = useAppContext();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth + adjustedFirstDay }, (_, index) => {
    return index >= adjustedFirstDay ? index - adjustedFirstDay + 1 : null;
  });

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
          {daysArray.map((day, index) => {
            const dayString = `${currentYear}-${currentMonth + 1}-${day}`;
            const isSelected = dayString === selectedDay;

            return (
              <div
                key={index}
                className={`day ${isSelected ? 'selected' : ''}`}
                onClick={() => day && setSelectedDay(dayString)}>
                {day ? <div>{day}</div> : <div>&nbsp;</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
