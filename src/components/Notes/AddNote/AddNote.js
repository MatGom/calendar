import { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import './AddNote.css';

const AddNote = () => {
  const { setAddNoteOpen } = useAppContext();
  const [isAllDay, setIsAllDay] = useState(true);
  const [time, setTime] = useState('12:00');

  const handleCloseAddNote = () => {
    setAddNoteOpen(false);
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
  };

  const toggleAllDay = () => {
    setIsAllDay(!isAllDay);
  };

  return (
    <div className='add-note'>
      <h4>Add Note</h4>
      <div>
        <label>
          <input type='checkbox' checked={isAllDay} onChange={toggleAllDay} />
          All Day
        </label>
      </div>
      {!isAllDay && (
        <div>
          <label htmlFor='note-time'>Time:</label>
          <input id='note-time' type='time' value={time} onChange={handleTimeChange} />
        </div>
      )}
      <textarea placeholder='Your note...' />
      <button>Save</button>
      <button onClick={handleCloseAddNote}>Close</button>
    </div>
  );
};

export default AddNote;
