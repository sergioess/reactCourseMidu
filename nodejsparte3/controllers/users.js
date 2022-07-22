const usersRouter = require('express').Router();
// const { request } = require('express');
const User = require('../model/User')
const bcrypt = require('bcrypt');


//comparar el password generado vs el ingresado para login
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });


//otra forma de comparar
// async function checkUser(username, password) {
//     //... fetch user from a db etc.
//     const match = await bcrypt.compare(password, user.passwordHash);
//     if(match) {
//         //login
//     }
// }

usersRouter.post('/', async (request, response) => {

    const { body } = request;

    const { username, name, password } = body;
    const salt = 10;
    const newhash = await bcrypt.hashSync(password, salt);

    const user = new User({
        username,
        name,
        passwordHash: newhash
    });

    User.find

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

//Consulta todos los usuarios
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', {
        title: 1,
        body: 1,
        date: 1,
        important: 1,  //_id:0
    })
    response.status(200).json(users);

    // console.log(users);
});

module.exports = usersRouter;


// "username": "sergioess",
// "name": "Sergio Sanmiguel",
// "password": "sess1215"