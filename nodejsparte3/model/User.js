const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Este es el equema o contrato 
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});
userSchema.plugin(uniqueValidator);

//Transformar la salida
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

//Creamos el modelo
const User = model('User', userSchema);

module.exports = User;