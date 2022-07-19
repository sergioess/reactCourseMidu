const mongoose = require('mongoose');

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI


mongoose.connect(connectionString, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.error(err);
    })


process.on('uncaughtException', () => {
    console.log('Estoy cerrando la conexióna a la Base de Datos')
    mongoose.connection.disconnect();
});



// Crear un documento en la base de datos

// const note = new Note({
//     userId: Math.random(),
//     title: 'MongoDB',
//     body: 'noSQL databasae',
//     dare: new Date(),
//     important: true
// });

// note.save()
//     .then(result => {
//         console.log(result);
//         mongoose.connection.close();

//     })
//     .catch((err) => {
//         console.error(err);
//     });


// Note.find({})
//     .then(result => {
//         console.log(result);
//         mongoose.connection.close();

//     })
//     .catch((err) => {
//         console.error(err);
//     });
