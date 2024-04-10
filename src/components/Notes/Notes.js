import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import './Notes.css';
import { monthNames } from '../../data/calendar-data';

import NoteModal from './NoteModal/NoteModal';

const Notes = () => {
  const { selectedDay, noteModalOpen, setNoteModalOpen, notes, startEditNote, deleteNote } = useAppContext();
  const [noteToDelete, setNoteToDelete] = useState(null);

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
    setNoteModalOpen(true);
  };

  const handleEditClick = (note, index) => {
    startEditNote(note, index);
    setNoteModalOpen(true);
  };

  const handleShowConfirmModal = index => {
    setNoteToDelete(index);
  };

  const handleCloseConfirmModal = () => {
    setNoteToDelete(null);
  };

  const handleDeleteNote = () => {
    if (noteToDelete !== null) {
      deleteNote(selectedDay, noteToDelete);
      setNoteToDelete(null);
    }
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
              <button onClick={() => handleEditClick(note, index)}>Edit</button>
              <button onClick={() => handleShowConfirmModal(index)}>Delete</button>
              {noteToDelete !== null && (
                <div className='confirm'>
                  <p>Are you sure?</p>
                  <button onClick={() => handleDeleteNote(index)}>Yes</button>
                  <button onClick={handleCloseConfirmModal}>Cancel</button>
                </div>
              )}
            </div>
          ))}
          {noteModalOpen && <NoteModal />}
        </>
      )}
    </div>
  );
};

export default Notes;
