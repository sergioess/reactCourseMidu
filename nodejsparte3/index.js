require('dotenv').config();
console.log('Hey');
// const http = require('http');
require('./mongodb');

//Los Modulos
const express = require('express');
const cors = require('cors');

//Middlewares
const logger = require('./middleware/loggerMiddleware');
const handleErrors = require('./middleware/handleErrors');
const notFound = require('./middleware/notFound');

//Llamado a Rutas y Controlles
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');


//Inicia la aplicación
const app = express();
app.use(cors({
    origin: '*'
}));
process.env.TZ = 'America/Bogota'

app.use(express.json());
app.use(express.static('../inicio/build')); //Para servir una carpeta estática se pueden hacer sub carpetas

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



//Rutas
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

//Middleware
app.use(notFound);
app.use(handleErrors)


const PORT = process.env.port || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };