const notesRouter = require('express').Router();
// const { request } = require('express');
const Note = require('../model/Notes');
const User = require('../model/User');

//Consultar todos con Promesas
// notesRouter.get('', (request, response) => {
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
notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('userId', {
        username: 1,
        name: 1
    })
    response.json(notes);

    console.log(notes);
});



//Consultar uno
notesRouter.get('/:id', (request, response, next) => {
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
// notesRouter.delete('/:id', (request, response, next) => {
//     const id = request.params.id;   //La request siempre va a llegar un string
//     console.log('Id a borrar', id);
//     Note.findByIdAndRemove(id).then(() => {
//         response.status(204).end()
//     })
//         .catch(err => next(err));
// });

//Eliminar con async y await
notesRouter.delete('/:id', async (request, response, next) => {
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
// notesRouter.post('/', (request, response) => {
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
notesRouter.post('/', async (request, response, next) => {
    // const note = request.body;
    const {
        title,
        body,
        important = false,
        userId
    } = request.body;

    const user = await User.findById(userId)

    console.log('El titulo -> ', title);
    // console.log('El titulo -> ', note);
    // response.send(note);

    if (!body) {
        return response.status(400).json({
            error: 'body es missing'
        });
    }

    if (!title) {
        return response.status(400).json({
            error: 'title es missing'
        });
    }

    const newNote = new Note({
        userId: user._id,
        title,
        body,
        date: new Date(),
        important
    });

    try {
        const saveNote = await newNote.save();
        console.log(saveNote);

        user.notes = user.notes.concat(saveNote._id);
        await user.save();


        response.status(201).json(saveNote);

    } catch (error) {
        next(error)
    }

});

//Actualizar
notesRouter.put('/:id', (request, response) => {
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


module.exports = notesRouter;