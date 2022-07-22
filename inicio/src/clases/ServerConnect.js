import { ServConnPost } from './ServConnPost';
import './formulario.css';
// import { getAllPosts } from '../services/posts/getAllPosts';
// import { createPost } from '../services/posts/createPost';

import { getAll as getAllPosts, create as createPost } from '../services/posts';
import { makeLogin } from '../services/login';

import { useEffect, useState } from 'react';
// import axios from 'axios';



export default function ServerConnect() {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);




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

        if (window.localStorage.getItem('user')) {
            const userLogguer = window.localStorage.getItem('user')
            const objectUSer = JSON.parse(userLogguer);
            setUser(objectUSer);
        }


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
            setNotes((prevNotes) => prevNotes.concat(newPost));
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
    }

    const handleLogin = (event) => {
        event.preventDefault();
        // console.log('usuario', userName)

        const user2 = {
            username: userName,
            password: password
        }

        setUserName('');
        setPassword('');

        makeLogin(user2).then((response) => {
            // console.log('Respuesta', response)
            setUser(response)
            window.localStorage.setItem('user', JSON.stringify(response));

        })
            .catch((e) => {
                // console.error('Login Fail');
                setError('Login Fail');
                setTimeout(() => {
                    setError('');
                }, 5000);
            });

    }

    const handleShowAll = () => {
        setShowAll(() => !showAll);
    }

    if (!notes) {
        return <p><h3>No hay notas para mostrar</h3></p>
    }


    const renderLoginForm = () => {
        return (
            <form className="row text-center px-5 pt-2" onSubmit={handleLogin}>
                <input type="text" value={userName} name='Username' placeholder='Username' onChange={(event) => setUserName(event.target.value)} />
                <input type="password" value={password} name='Pasword' placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
                <button type="submit" className="btn btn-primary d-block mt-2" >Login</button>

            </form>
        )
    }

    const renderCreateNote = () => {

        return (
            <form className="row text-center px-5 pt-2" onSubmit={handleSubmit}>
                <input className="form-group" placeholder='Write new Note' type="text" onChange={handleInputChange} value={newNote}></input>
                <button type="submit" className="btn btn-primary d-block mt-2" >New Note</button>
            </form>

        )
    }

    return (


        <div className="App">
            <h1>Clase 4 del Bootcamp</h1>



            {user ? renderCreateNote() : renderLoginForm()}




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

            {error ? <span style={{ color: "red" }}> {error} </span> : ''}

            {/* <Notification message={error} /> */}

            <div>
                <p>Usuario: {user ? user.token : ''}</p>
            </div>

        </div>
    );
}