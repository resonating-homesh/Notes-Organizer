import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';

export default function About() {

    const a = useContext(NoteContext);

  return (
    <div className='container center'>
    <h1>Welcome to Your Notes!</h1>
    <p>This web-app is a simple collection point for all of your notes.</p>
        
    </div>
  )
}
