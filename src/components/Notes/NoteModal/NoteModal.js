import { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import './NoteModal.css';

const NoteModal = () => {
  const { setNoteModalOpen, addNote, selectedDay, editingNote, stopEditNote, updateNote } = useAppContext();
  const [isAllDay, setIsAllDay] = useState(true);
  const [time, setTime] = useState('12:00');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setIsAllDay(editingNote.isAllDay);
      setTime(editingNote.time);
      setNoteContent(editingNote.content);
    }
  }, [editingNote]);

  const handleCloseAddNote = () => {
    setNoteModalOpen(false);
  };

  const handleSaveNote = () => {
    if (noteContent.trim() === '') {
      return;
    }

    if (editingNote) {
      updateNote(selectedDay, { content: noteContent, isAllDay, time }, editingNote.index);
    } else {
      addNote(selectedDay, noteContent, isAllDay, time);
    }

    setNoteContent('');
    setIsAllDay(true);
    setTime('12:00');
    setNoteModalOpen(false);
    if (editingNote) stopEditNote();
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
  };

  const toggleAllDay = () => {
    setIsAllDay(!isAllDay);
  };

  return (
    <div className='note-modal'>
      <h4>{editingNote ? 'Edit Note' : 'Add Note'}</h4>
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
      <textarea placeholder='Your note...' value={noteContent} onChange={e => setNoteContent(e.target.value)} />
      <button onClick={handleSaveNote}>Save</button>
      <button onClick={handleCloseAddNote}>Close</button>
    </div>
  );
};

export default NoteModal;
