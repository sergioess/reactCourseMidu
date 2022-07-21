import { ServConnPost } from './ServConnPost';
import './formulario.css';
// import { getAllPosts } from '../services/posts/getAllPosts';
// import { createPost } from '../services/posts/createPost';

import { getAll as getAllPosts, create as createPost } from '../services/posts';

import { useEffect, useState } from 'react';
// import axios from 'axios';



export default function ServerConnect() {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // console.log(notes);
    // setNotes([...notes]);


    //useEffect => Se ejecuta cada vez que se renderiza, se le pasa una funcion y un array de dependencias, la idea es que se ejecute solo la primeta vez
    useEffect(() => {
        setLoading(true);

        // fetch('https://jsonplaceholder.typicode.com/posts')

        // fetch('http://200.6.171.154:30003/apiireportes/getalmacenes.php')
        //     .then(response => response.json())
        //     .then(json => {

        //         setNotes(json);
        //         // console.log(notes);
        //         setLoading(false);

        //     });

        // axios
        //     .get('http://200.6.171.154:30003/apiireportes/getalmacenes.php')
        //     .then(response => {
        //         const { data } = response;
        //         setNotes(data);
        //         // console.log(notes);
        //         setLoading(false);

        //     });

        getAllPosts().then((posts) => {
            setNotes(posts);
            // console.log(posts);

            setLoading(false);
        });




    }, []);


    //Otro useEffect solo con el newNote
    useEffect(() => {
        console.log("Se ejecuta solo cuando se actualiza newNote");
    }, [newNote]);

    // setNotes([...notes, json])

    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newNoteClass = {
            userId: '62d73b368bdbfb845d0cf9b6',
            id: notes.length + 1,
            title: newNote,
            body: newNote,
        };

        // axios
        //     .post('https://jsonplaceholder.typicode.com/posts', newNoteClass)
        //     .then(response => {
        //         const { data } = response;
        //         // setNotes([...notes, data]);
        //         setNotes((prevNotes) => prevNotes.concat(data));

        //     });

        setError('');
        console.log(newNoteClass);
        createPost(newNoteClass).then((newPost) => {
            setNotes((prevNotes) => prevNotes.concat(newPost));
        })
            .catch((e) => {
                console.error(e);
                setError("La Aplicación ha fallado");
            });


        // setNotes([...notes, newNoteClass]);
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

            {loading ? 'Cargando...' : ""}

            {

                notes.map((nota) => {
                    return (
                        <ServConnPost {...nota} key={nota.id} />
                    );
                })

            }
            <form className="row text-center px-5 pt-2" onSubmit={handleSubmit}>
                <input className="form-group" type="text" onChange={handleInputChange} value={newNote}></input>
                <button type="submit" className="btn btn-primary d-block mt-2" >New Note</button>
            </form>
            {error ? <span style={{ color: "red" }}> error </span> : ''}

        </div>
    );
}