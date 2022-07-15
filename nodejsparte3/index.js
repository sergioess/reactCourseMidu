
console.log('Hey');
// const http = require('http');
const express = require('express');
const logger = require('./loggerMiddleware');

const app = express();
app.use(express.json());

// Este es un middlelware, que intercepta la request y hace algo

app.use(logger);


let notes = [
    {
        id: 1,
        content: 'HTML is easy, ok',
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
    }
];

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(notes));
// });


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});


app.get('/notes', (request, response) => {
    response.json(notes);
});

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id);   //La request siempre va a llegar un string
    const note = notes.find(note => note.id === id);
    note ? response.json(note) : response.status(404).end();
});


app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id);   //La request siempre va a llegar un string
    notes = notes.filter(note => note.id != id);
    notes ? response.json(notes) : response.status(404).end();
});

app.post('/notes', (request, response) => {
    const note = request.body;
    // response.send(note);

    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content es missing'
        });
    }

    const ids = notes.map(note => note.id);
    const maxId = Math.max(...ids);

    const newNote = {
        id: maxId + 1,
        date: new Date().toISOString(),
        content: note.content,
        important: typeof note.important != 'undefined' ? note.important : false
    }

    notes = [...notes, newNote];
    response.status(201).json(newNote);
});

app.use((request, response, next) => {
    response.status(404).json({
        error: 'Not found'
    });
    next();
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});