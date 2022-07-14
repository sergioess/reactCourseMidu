import { Clase4Note } from './Clase4Note';
import './formulario.css';

import { useState } from 'react';


export default function Formulario(props) {

    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // console.log(notes);
    // setNotes([...notes]);

    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newNoteClass = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };
        setNotes([...notes, newNoteClass]);
        // console.log(newNoteClass);
        setNewNote("");
    }

    const handleShowAll = () => {
        setShowAll(() => !showAll);
    }

    if (!notes) {
        return <p><h3>No hay notas para mostrar</h3></p>
    }

    return (


        <div className="App">
            <h1>Clase 4 del Bootcamp</h1>
            <div className="row py-2 px-5">
                <button onClick={handleShowAll} className="btn btn-secondary d-block "> {showAll ? 'Show only inportant' : 'Show All'} </button>

            </div>

            {

                notes
                    .filter((nota) => {
                        if (showAll === true) return true;
                        return nota.important === true;
                    }

                    )
                    .map((nota) => {
                        return (
                            <Clase4Note {...nota} key={nota.id} />
                        );
                    })

            }
            <form className="row text-center px-5 pt-2" onSubmit={handleSubmit}>
                <input className="form-group" type="text" onChange={handleInputChange} value={newNote}></input>
                <button type="submit" className="btn btn-primary d-block mt-2" >New Note</button>
            </form>
        </div>
    );
}