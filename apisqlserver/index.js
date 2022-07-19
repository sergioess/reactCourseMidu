const express = require('express');
const cors = require('cors');

const { connection } = require('./connectdb');

//Inicia la aplicación
const app = express();
app.use(cors({
    origin: '*'
}));



app.use(express.json());
app.use(express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas
app.use('/images', express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas
app.use('/static', express.static('images')); //Para servir una carpeta estática se pueden hacer sub carpetas



app.get('/', (request, response) => {
    const htmlTexto = '<h1>Hello World</h1><br>' + request.ip;
    console.log(request.ip);
    console.log(request.ips);
    console.log(request.originalUrl);
    console.log(request);
    response.send(htmlTexto);

});

app.get('/api/vendedores', async (request, response, next) => {
    // how to execute a query without parameters
    try {
        const result = await connection.executeQuery(
            'select top 2 * from vendedores'
        );
        response.json(result.data[0]);
        console.log(result.data[0])

    } catch (error) {
        console.log(error)
    }
})


const PORT = process.env.port || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// module.exports = { app, server };