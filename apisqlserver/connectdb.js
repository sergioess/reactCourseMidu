const connection = new (require('rest-mssql-nodejs'))({
    user: 'sa',
    password: 'masterkey',
    server: '127.0.0.1', // replace this with your IP Server
    database: 'MNGCACAREO'

});

module.exports = {
    connection
}