import { useAppContext } from '../../context/AppContext';
import './Notes.css';
import { monthNames } from '../../data/calendar-data';

const Notes = () => {
  const { selectedDay, notes, setNotes } = useAppContext();

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

  return (
    <div className='notes'>
      {selectedDay && (
        <>
          <h3>Notes for {getFormattedDate(selectedDay)}</h3>
          <textarea
            className='notes-text'
            value={notes[selectedDay] || ''}
            onChange={e => {
              setNotes({ ...notes, [selectedDay]: e.target.value });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Notes;
