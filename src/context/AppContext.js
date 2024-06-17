import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [selectedDay, setSelectedDay] = useState(todayFormatted);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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

  const sortNotesByTime = notesArray => {
    return notesArray.sort((a, b) => {
      if (a.isAllDay && !b.isAllDay) return -1;
      if (!a.isAllDay && b.isAllDay) return 1;
      if (!a.isAllDay && !b.isAllDay) {
        return a.time.localeCompare(b.time);
      }
      return 0;
    });
  };

  const addNote = (date, noteContent, isAllDay, time) => {
    const newNote = {
      content: noteContent,
      isAllDay,
      time: isAllDay ? 'All Day' : time,
    };
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      const notesForDate = updatedNotes[date] ? [...updatedNotes[date], newNote] : [newNote];
      updatedNotes[date] = sortNotesByTime(notesForDate);
      return updatedNotes;
    });
  };

  const startEditNote = (note, index) => {
    setEditingNote({ ...note, index });
  };

  const stopEditNote = () => {
    setEditingNote(null);
  };

  const updateNote = (date, updatedNote, index) => {
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      if (updatedNotes[date]) {
        updatedNotes[date][index] = updatedNote;
        updatedNotes[date] = sortNotesByTime(updatedNotes[date]);
      }
      return updatedNotes;
    });
  };

  const deleteNote = (date, index) => {
    setNotes(prevNotes => {
      const updatedNotes = { ...prevNotes };
      updatedNotes[date] = updatedNotes[date].filter((_, noteIndex) => noteIndex !== index);

      if (updatedNotes[date].length === 0) {
        delete updatedNotes[date];
      }

      return updatedNotes;
    });
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
        noteModalOpen,
        setNoteModalOpen,
        addNote,
        startEditNote,
        stopEditNote,
        editingNote,
        updateNote,
        deleteNote,
        todayFormatted,
      }}>
      {children}
    </AppContext.Provider>
  );
};