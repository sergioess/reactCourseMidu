const { Schema, model } = require('mongoose');

//Este es el equema o contrato 
const noteSchema = new Schema({
    userId: Number,
    title: String,
    body: String,
    date: Date,
    important: Boolean
});

//Transformar la salida
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
    }
})

//Creamos el modelo
const Note = model('Note', noteSchema);

module.exports = Note;