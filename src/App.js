import { useState } from 'react';

import Calendar from './Calendar';
import Notes from './Notes';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  const [notes, setNotes] = useState({});
  console.log(notes);

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
    <div>
      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <Notes selectedDay={selectedDay} notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
