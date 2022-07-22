const loginRutes = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//Consultar todos con async y await
loginRutes.post('/', async (request, response) => {

    const { body } = request;

    const { username, password } = body;

    const user = await User.findOne({ username });

    // console.log('El Usuario -> ', username);
    // console.log('El Password -> ', password);

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        response.status(401).json({ error: 'invalid user or password' });
    }

    const userForToken = {
        id: user._id,
        name: user.name,
        username: user.username
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7
    });
    //segundos * minutos * horas * días   60 * 60 * 24 * 7
    response.status(200).send({
        id: user._id,
        name: user.name,
        username: user.username,
        token
    });


});


module.exports = loginRutes;