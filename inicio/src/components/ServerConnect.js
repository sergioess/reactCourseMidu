import { ServConnPost } from './ServConnPost';
import './formulario.css';
// import { getAllPosts } from '../services/posts/getAllPosts';
// import { createPost } from '../services/posts/createPost';

import { getAll as getAllPosts } from '../services/posts';
import { makeLogin } from '../services/login';

import { useEffect, useState } from 'react';
// import axios from 'axios';

//Componentes
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';


export default function ServerConnect() {

    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);




    // console.log(notes);
    // setNotes([...notes]);


    //useEffect => Se ejecuta cada vez que se renderiza, se le pasa una funcion y un array de dependencias, la idea es que se ejecute solo la primeta vez
    // por eso el array de dependencias queda vacio
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

    //Otro useEffect para leer el localStorage
    useEffect(() => {
        const userLogguer = window.localStorage.getItem('user')
        if (userLogguer) {

            const objectUSer = JSON.parse(userLogguer);
            setUser(objectUSer);
        }
    }, []);




    // setNotes([...notes, json])

    const handleLogOut = (event) => {
        setUser(null);
        window.localStorage.removeItem('user');
    }

    const addNote = (noteObject) => {
        setNotes(notes.concat(noteObject));
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


    return (


        <div className="App">
            <h1>Clase 4 del Bootcamp</h1>


            {user ? <NoteForm
                handleLogOut={handleLogOut}
                setError={setError}
                setNotes={setNotes}
                addNote={addNote}
                user={user}
            />

                : <LoginForm
                    username={userName}
                    password={password}
                    handleUserNameChange={(event) => setUserName(event.target.value)}
                    handlePasswordChange={(event) => setPassword(event.target.value)}
                    handleLogin={handleLogin}
                />}




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