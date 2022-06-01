import React, { useContext } from 'react';
import { Notes } from './Notes';
import NoteContext from '../context/NoteContext';

export const NoteItem = (props) => {
    const {note, updateNote} = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const handleClick=()=>
    {
        {deleteNote(note._id)};
        props.showAlert("Deleted Note Successfuly","success")
    }
  return (
    <div className="col md-3 my-2">
    <div className="card" style={{width:"18rem"}}>
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
  <div className="row3">
    <h5 className="card-title"> {note.title}</h5>
    <i className="fa-solid fa-pen-to-square" onClick={()=>{
      updateNote(note)
    }} ></i>
    </div>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can" onClick={handleClick}></i>
    {/* <a href="#" className="btn btn-primary">Delete</a> */}
  </div>
</div>
    
       
        
    </div>
  )
}
