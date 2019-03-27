const myDB = require('mysql2');


// createPool() ..... create multiple connection and always ready everytime query is run
// createConnection() ..... only create single connection
const pool = myDB.createPool({
    host: 'localhost',
    port: 3306,
    database: 'nodejs_max',
    user: 'root',
    password: 'Wiwi12345'
});

module.exports = pool.promise();