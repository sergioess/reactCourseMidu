const { server } = require('../index')

const Note = require('../model/Notes')


const { initialNotes, api, getAllContentFromNotes } = require('./helpers')


beforeEach(async () => {
    await Note.deleteMany({});

    // const note1 = new Note(initialNotes[0]);
    // await note1.save();

    // const note2 = new Note(initialNotes[1]);
    // await note2.save();

    for (const note of initialNotes) {
        const noteObject = new Note(note)
        await noteObject.save()
    }



})


test('notes are returned as json', async () => {
    await api.get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length);
})

test('the first note es about Bootcamp', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].title).toBe('Aprendiendo en Bootcamp');
})

test('some title es about Bootvamp', async () => {

    const { titles, response } = await getAllContentFromNotes();

    expect(titles).toContain('Aprendiendo en Bootcamp');
})

test('a valid note can be added', async () => {
    const newNote = {
        userId: 1,
        title: 'Segundo Tema',
        body: 'Frontend whit React',
        date: new Date(),
        important: true
    };
    await api.post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const { titles, response } = await getAllContentFromNotes();


    expect(titles).toContain(newNote.title);
    expect(response.body).toHaveLength(initialNotes.length + 1);


})


test('a note without a title is not added', async () => {
    const newNote = {
        body: 'Frontend whit React',
        date: new Date(),
        important: true
    };
    await api.post('/api/notes')
        .send(newNote)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length);


})

describe('DELETE NOTE ------', () => {
    test('a note can be delete', async () => {
        const { response: firstResponse } = await getAllContentFromNotes();
        const id = firstResponse.body[0].id;
        const noteToDelete = firstResponse.body[0]
        await api.delete(`/api/notes/${id}`)
            .expect(204)

        const { response: secondResponse, titles } = await getAllContentFromNotes();
        expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
        expect(titles).not.toContain(noteToDelete.title);
    })

    test('a note that not exist can not be delete', async () => {


        await api.delete('/api/notes/123456')
            .expect(400)

        const { response: secondResponse } = await getAllContentFromNotes();
        expect(secondResponse.body).toHaveLength(initialNotes.length)
    })
})



afterAll(() => {
    server.close();
})