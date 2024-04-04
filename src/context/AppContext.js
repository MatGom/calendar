import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  const [notes, setNotes] = useState({});
  const [addNoteOpen, setAddNoteOpen] = useState(false);
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

  const addNote = (date, noteContent, isAllDay, time) => {
    const newNote = {
      content: noteContent,
      isAllDay,
      time: isAllDay ? "All Day" : time, 
    };
    setNotes((prevNotes) => ({
      ...prevNotes,
      [date]: [...(prevNotes[date] || []), newNote],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        selectedDay,
        setSelectedDay,
        notes,
        setNotes,
        prevMonth,
        nextMonth,
        addNoteOpen,
        setAddNoteOpen,
        addNote,
      }}>
      {children}
    </AppContext.Provider>
  );
};
