import { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import './NoteModal.css';

const NoteModal = () => {
  const { setNoteModalOpen, addNote, selectedDay, editingNote, stopEditNote, updateNote } = useAppContext();
  const [isAllDay, setIsAllDay] = useState(true);
  const [time, setTime] = useState('12:00');
  const [noteContent, setNoteContent] = useState('');
  const [notePlaceholder, setNotePlaceholder] = useState('Add your note...');

  useEffect(() => {
    if (editingNote) {
      setIsAllDay(editingNote.isAllDay);
      setTime(editingNote.time);
      setNoteContent(editingNote.content);
    }
  }, [editingNote]);

  const handleCloseAddNote = () => {
    setNoteModalOpen(false);
    stopEditNote();
  };

  const handleSaveNote = () => {
    if (noteContent.trim() === '') {
      setNotePlaceholder('Note must not be empty!');
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
    setNotePlaceholder('Add your note...');
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
      <div className='note-modal-wrapper'>
        <h4 className='note-modal-title'>{editingNote ? 'Edit Note' : 'Add Note'}</h4>
        <div>
          <label>
            <input className='note-modal-checkbox' type='checkbox' checked={isAllDay} onChange={toggleAllDay} />
            All Day
          </label>
        </div>
        <div className={!isAllDay ? '' : 'inactive'}>
          <label className='note-modal-time' htmlFor='note-time'>
            Time
          </label>
          <input
            disabled={!isAllDay ? false : true}
            id='note-time'
            type='time'
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <input
          className='note-modal-content'
          placeholder={notePlaceholder}
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
        />
        <div className='note-modal-buttons'>
          <button className='save-button' onClick={handleSaveNote}>
            Save
          </button>
          <button className='close-button' onClick={handleCloseAddNote}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
