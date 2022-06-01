import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/NoteContext';
import { NoteItem } from './NoteItem';
import '../App.css';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const { showAlert } = props;
    const history = useNavigate();
    const context = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const { notes, getNotes, editNote, setNotes, addNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            history("/login");
        }
       
    }, [localStorage.getItem('token')]);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Note Updated Successfully", "success");
    }

    return (
        <div className='container'>
            <AddNote showAlert={showAlert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description*</label>
                                    <input type="text" className="form-control" id="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-check-label" htmlFor="exampleCheck1">Tag</label>
                                    <input type="text" className="form-control" id="etag" onChange={onChange} value={note.etag} minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription < 5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3'>
                <h2>Your Notes</h2>
                <div className='container row2'>
                    {notes.length === 0 && "Add Notes to display!"}
                    {notes.map((note) => {
                        return <NoteItem showAlert={showAlert}  note={note} key={note._id} updateNote={updateNote} />;
                    })}
                </div>

            </div>
        </div>
    )
}