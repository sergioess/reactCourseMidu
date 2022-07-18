const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB_URI;


mongoose.connect(connectionString, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) => {
        console.error(err);
    })


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
