import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import './Notes.css';
import { monthNames } from '../../data/calendar-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
          <div className='title-wrapper'>
            <h3 className='title'>Notes</h3>
            <p>{getFormattedDate(selectedDay)}</p>
          </div>
          {notes[selectedDay]?.map((note, index) => (
            <div key={index} className='note'>
              {<p className='note-time'>{note.isAllDay ? 'All Day' : `${note.time}`}</p>}
              <p className='note-content'>{note.content}</p>
              <FontAwesomeIcon className='note-edit' onClick={() => handleEditClick(note, index)} icon={faPen} />
              <FontAwesomeIcon
                className='note-delete'
                onClick={() => handleShowConfirmModal(index)}
                icon={faTrashCan}
              />
              {noteToDelete !== null && (
                <div className='confirm'>
                  <p>Are you sure?</p>
                  <button onClick={() => handleDeleteNote(index)}>Yes</button>
                  <button onClick={handleCloseConfirmModal}>Cancel</button>
                </div>
              )}
            </div>
          ))}
          <FontAwesomeIcon className='add-note' onClick={handleOpenAddNote} icon={faSquarePlus} />
          {noteModalOpen && <NoteModal />}
        </>
      )}
    </div>
  );
};

export default Notes;
