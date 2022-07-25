import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully","success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title*</label>
                    <input type="text" minLength={3} required className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description*</label>
                    <input type="text" minLength={5} required className="form-control" value={note.description} id="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-check-label" htmlFor="exampleCheck1">Tag</label>
                    <input type="text" minLength={3} required className="form-control" value={note.tag} id="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description < 5} type="submit" onClick={handleClick} className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}
export default AddNote