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
app.use(express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas
app.use('/images', express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas
app.use('/static', express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas

// Este es un middlelware, que intercepta la request y hace algo
app.use(logger);


app.get('/', (request, response) => {
    const htmlTexto = '<h1>Hello World</h1><br>' + request.ip;
    console.log(request.ip);
    console.log(request.ips);
    console.log(request.originalUrl);
    console.log(request);
    response.send(htmlTexto);

});


//Consultar todos con Promesas
// app.get('/api/notes', (request, response) => {
//     Note.find({})
//         .then(notes => {
//             console.log(notes);
//             response.json(notes);
//         })
//         .catch((err) => {
//             console.error(err);
//         });

// });

//Consultar todos con async y await
app.get('/api/notes', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes);

    console.log(notes);
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


//Eliminar con Promesas
// app.delete('/api/notes/:id', (request, response, next) => {
//     const id = request.params.id;   //La request siempre va a llegar un string
//     console.log('Id a borrar', id);
//     Note.findByIdAndRemove(id).then(() => {
//         response.status(204).end()
//     })
//         .catch(err => next(err));
// });

//Eliminar con async y await
app.delete('/api/notes/:id', async (request, response, next) => {
    const id = request.params.id;   //La request siempre va a llegar un string
    console.log('Id a borrar', id);
    try {
        await Note.findByIdAndRemove(id)
        response.status(204).end()

    }
    catch (error) {
        next(error)
    }


});


//Crear con Promesa
// app.post('/api/notes', (request, response) => {
//     const note = request.body;
//     console.log('El titulo -> ', note.title);

//     if (!note || !note.body) {
//         return response.status(400).json({
//             error: 'note.body es missing'
//         });
//     }

//     if (!note.title) {
//         return response.status(400).json({
//             error: 'note.body.title es missing'
//         });
//     }

//     const newNote = new Note({
//         userId: note.userId,
//         title: note.title,
//         body: note.body,
//         date: new Date,
//         important: note.important || false
//     })
//     newNote.save().then(savedNote => {
//         response.status(201).json(savedNote);

//     })
//         .catch((err) => {
//             console.error(err);
//         });
// });

//Crear con async y await
app.post('/api/notes', async (request, response, next) => {
    const note = request.body;
    console.log('El titulo -> ', note.title);
    // console.log('El titulo -> ', note);
    // response.send(note);

    if (!note || !note.body) {
        return response.status(400).json({
            error: 'note.body es missing'
        });
    }

    if (!note.title) {
        return response.status(400).json({
            error: 'note.body.title es missing'
        });
    }

    const newNote = new Note({
        userId: note.userId,
        title: note.title,
        body: note.body,
        date: new Date,
        important: note.important || false
    })

    try {
        const saveNote = await newNote.save()
        response.status(201).json(saveNote);

    } catch (error) {
        next(error)
    }



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
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };