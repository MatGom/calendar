import { useAppContext } from '../../context/AppContext';
import './Notes.css';
import { monthNames } from '../../data/calendar-data';

import AddNote from './AddNote/AddNote';

const Notes = () => {
  const { selectedDay, addNoteOpen, notes, setAddNoteOpen } = useAppContext();

  const getFormattedDate = dateString => {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = parseInt(dateParts[2], 10);

    const getOrdinalSuffix = day => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
    return formattedDate;
  };

  const handleOpenAddNote = () => {
    setAddNoteOpen(true);
  };

  return (
    <div className='notes'>
      {selectedDay && (
        <>
          <h3>Notes for {getFormattedDate(selectedDay)}</h3>
          <button onClick={handleOpenAddNote}>Add note</button>
          {notes[selectedDay]?.map((note, index) => (
            <div key={index} className='note'>
              {<p>{note.isAllDay ? 'All Day' : `${note.time}`}</p>}
              <p>{note.content}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}
          {addNoteOpen && <AddNote />}
        </>
      )}
    </div>
  );
};

export default Notes;
