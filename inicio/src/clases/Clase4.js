import './clase4.css';
// import { useState } from 'react';
import { Clase4Note } from './Clase4Note';

const notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: false,
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true,
    },
    {
        id: 4,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 5,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: false,
    },
    {
        id: 6,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true,
    },
]





function Clase4() {

    if (!notes) {
        return <p><h3>No hay notas para mostrar</h3></p>
    }

    return (
        <div className="App">
            <h1>Clase 4 del Bootcamp</h1>

            {
                notes.map((nota) => {
                    return (
                        <Clase4Note {...nota} key={nota.id} />
                    );
                })
            }

        </div >
    );
}

export default Clase4;
