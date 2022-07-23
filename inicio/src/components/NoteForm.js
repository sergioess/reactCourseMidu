import React from 'react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { create as createPost } from '../services/posts';
import Togglable from './Togglable';



export default function NoteForm({ handleLogOut, setError, addNote, user }) {
    const [newNote, setNewNote] = useState('');

    const togglableRef = useRef();

    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setNewNote(event.target.value);
    };

    //Otro useEffect solo con el newNote
    useEffect(() => {
        console.log("Se ejecuta solo cuando se actualiza newNote");
    }, [newNote]);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('El id', window.localStorage.getItem('user').id)

        const newNoteClass = {
            userId: user.id,
            title: newNote,
            body: newNote,
            token: user.token
        };

        // axios
        //     .post('https://jsonplaceholder.typicode.com/posts', newNoteClass)
        //     .then(response => {
        //         const { data } = response;
        //         // setNotes([...notes, data]);
        //         setNotes((prevNotes) => prevNotes.concat(data));

        //     });

        // const token = user.token;

        setError('');
        console.log(newNoteClass);
        // console.log('Token 0', token);
        createPost(newNoteClass).then((newPost) => {
            // console.log('Token1', token)
            addNote(newPost);
        })
            .catch((e) => {
                console.error(e);
                setError("La Aplicación ha fallado");
                setTimeout(() => {
                    setError('');
                }, 5000);
            });


        // setNotes([...notes, newNoteClass]);
        // console.log(newNoteClass);
        setNewNote("");
        togglableRef.current.toggleVisibility();
    }

    return (
        <Togglable buttonLabel='New Note' ref={togglableRef}>
            <div>
                <h3>Create New Note</h3>
                <form className="row text-center px-5 pt-2" onSubmit={handleSubmit}>
                    <input className="form-group" placeholder='Write new Note' type="text" onChange={handleInputChange} value={newNote}></input>
                    <button type="submit" className="btn btn-primary d-block mt-2" >New Note</button>
                </form>
                <p><button type="submit" className="btn btn-danger d-block mt-2" onClick={handleLogOut}>Logout</button></p>

            </div>
        </Togglable>
    );
}