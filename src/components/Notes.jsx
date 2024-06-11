import { useState } from "react";
import dayjs from "dayjs";

export default function Notes() {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [editNoteText, setEditNoteText] = useState('');

    const createNote = () => {
        const note = {
            id : notes.length + 1,
            text : newNote,
            createDate : dayjs().format('MM/DD HH:mm')
        };
        setNotes([...notes, note]);
        setNewNote('');
    };
    const updateNote = (id) => {
        setNotes(notes.map((note) => {
            if (note.id === id) {
                return {
                    ...note,
                    text: editNoteText,
                    createDate: dayjs().format('MM/DD HH:mm')
                }
            }
            return note;
        }));
        setEditNoteId(null);
        setEditNoteText('');
    };
    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    }

    return (
        <div>
            <h2>노트</h2>
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={createNote}>노트 생성</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {
                            editNoteId === note.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editNoteText}
                                        onChange={(e) => setEditNoteText(e.target.value)}
                                    />
                                    <button onClick={() => updateNote(note.id)}>
                                        Update
                                    </button>
                                    <button onClick={() => setEditNoteId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    {note.text} - {note.createDate}
                                    <button onClick={() => {
                                        setEditNoteId(note.id);
                                        setEditNoteText(note.text);
                                    }}>Edit</button>
                                    <button onClick={() => deleteNote(note.id)}>Delete</button>
                                </>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}