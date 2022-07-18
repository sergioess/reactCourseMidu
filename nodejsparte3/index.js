require('dotenv').config();
console.log('Hey');
// const http = require('http');
require('./mongodb');

//Los Modulos
const express = require('express');
const cors = require('cors');


//Los Modelos
const Note = require('./model/Notes');

//Middlewares
const logger = require('./middleware/loggerMiddleware');
const handleErrors = require('./middleware/handleErrors');
const notFound = require('./middleware/notFound');


//Las Variables
// let notes = require('./notesdata');
// let notes = [];



//Inicia la aplicación
const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Este es un middlelware, que intercepta la request y hace algo
app.use(logger);


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
});


//Consultar todos
app.get('/api/notes', (request, response) => {
    Note.find({})
        .then(notes => {
            console.log(notes);
            response.json(notes);
            // mongoose.connection.close();
        })
        .catch((err) => {
            console.error(err);
        });

});

//Consultar uno
app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;   //La request siempre va a llegar un string

    Note.findById(id).then(note => {
        // console.log(note);
        note ? response.json(note) : response.status(404).end()
    })
        .catch((err) => {
            // console.error(err);
            // response.send('Parámetros inválidos').status(400).end()
            next(err);
        });
});


//Eliminar
app.delete('/api/notes/:id', (request, response, next) => {
    const id = request.params.id;   //La request siempre va a llegar un string
    // notes = notes.filter(note => note.id != id);
    // notes ? response.json(notes) : response.status(404).end();
    console.log('Id a borrar', id);
    Note.findByIdAndRemove(id).then(() => {
        // console.log(note);
        response.status(204).end()
    })
        .catch(err => next(err));
});


//Crear
app.post('/api/notes', (request, response) => {
    const note = request.body;
    console.log(note);
    // response.send(note);

    if (!note || !note.body) {
        return response.status(400).json({
            error: 'note.body es missing'
        });
    }


    const newNote = new Note({
        userId: note.userId,
        title: note.title,
        body: note.body,
        date: new Date,
        important: note.important || false
    })
    newNote.save().then(savedNote => {
        console.log(savedNote);
        response.status(201).json(savedNote);
        // mongoose.connection.close();

    })
        .catch((err) => {
            console.error(err);
        });


});

//Actualizar
app.put('/api/notes/:id', (request, response) => {
    const { id } = request.params;   //La request siempre va a llegar un string
    const note = request.body;

    console.log('La id', id);
    console.log('Datos', note);

    const newNote = {
        title: note.title,
        body: note.body,
        important: note.important || false
    }

    Note.findByIdAndUpdate(id, newNote, { new: true }).then(result => {
        console.log(result);
        response.json(result);
    });
});


//Middleware
app.use(notFound);
app.use(handleErrors)


const PORT = process.env.port || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});