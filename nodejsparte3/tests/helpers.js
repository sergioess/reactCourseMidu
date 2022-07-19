const supertest = require('supertest')
const { app } = require('../index')


const api = supertest(app);

const initialNotes = [
    {
        userId: 1,
        title: 'Aprendiendo en Bootcamp',
        body: 'Todo de FullStack',
        date: new Date(),
        important: true
    },
    {
        userId: 2,
        title: 'Mi primera Clase',
        body: 'Javascript',
        date: new Date(),
        important: true
    }

]



const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    console.log({ response });
    return {
        titles: response.body.map(note => note.title),
        response
    }

}

module.exports = {
    initialNotes,
    api,
    getAllContentFromNotes
}