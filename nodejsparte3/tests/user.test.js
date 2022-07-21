const { server } = require('../index');

const User = require('../model/User');
const bcrypt = require('bcrypt');
const { api } = require('./helpers');

const moongose = require('mongoose')



beforeEach(async () => {
    await User.deleteMany({});

    const salt = 10;
    const newhash = await bcrypt.hashSync('psw', salt);

    const user = new User({
        username: 'Usuario',
        passwordHash: newhash
    });

    await user.save();


})




test('works as expected creating  fresh username', async () => {
    const usersDB = await User.find({});
    const usersAtStart = usersDB.map(user => user.toJSON());


    const newUser = {
        username: 'Silvis',
        name: 'Silvia Fer',
        password: 'silvia'
    }

    await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const usersDBAfter = await User.find({});
    const usersAtEnd = usersDBAfter.map(user => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const userNames = usersDBAfter.map(user => user.username);
    expect(userNames).toContain(newUser.username);

})




afterAll(() => {
    moongose.connection.close();
    server.close();
})