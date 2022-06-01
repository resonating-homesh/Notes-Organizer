import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const notesInitial = [];
    const [notes, setNotes] = useState([]);

    //Get all notes
    const getNotes = async (title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };


    //Add a note
    const addNote = async (title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    const deleteNote = async (id) => {
        //API Call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id});
        setNotes(newNotes);
    };

    const editNote = async (id, title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes);
    };

   

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;