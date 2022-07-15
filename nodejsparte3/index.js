
console.log('Hey');
// const http = require('http');
const express = require('express');
const logger = require('./loggerMiddleware');
let notes = require('./notesdata');


const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Este es un middlelware, que intercepta la request y hace algo

app.use(logger);

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(notes));
// });


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});


app.get('/api/notes', (request, response) => {
    response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);   //La request siempre va a llegar un string
    const note = notes.find(note => note.id === id);
    note ? response.json(note) : response.status(404).end();
});


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);   //La request siempre va a llegar un string
    notes = notes.filter(note => note.id != id);
    notes ? response.json(notes) : response.status(404).end();
});

app.post('/api/notes', (request, response) => {
    const note = request.body;
    // console.log(note);
    // response.send(note);

    if (!note || !note.body) {
        return response.status(400).json({
            error: 'note.body es missing'
        });
    }

    const ids = notes.map(note => note.id);
    // console.log(ids);
    const maxId = Math.max(...ids);
    // console.log(maxId);

    const newNote = {
        // id: maxId + 1,
        // date: new Date().toISOString(),
        // body: note.content,
        // important: typeof note.important != 'undefined' ? note.important : false

        userId: maxId + 1,
        id: maxId + 1,
        title: note.body,
        body: note.body
    }
    console.log(newNote);

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