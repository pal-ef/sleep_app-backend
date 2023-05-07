const mysql = require('mysql2/promise');
require("dotenv").config();
const pool = mysql.createPool(process.env.DATABASE_URL);

//const connection = mysql.createConnection(process.env.DATABASE_URL);

// Try connecting with db
/*connection.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log('Connection with DB was successfull.');
    }
})*/

//connection.end();

module.exports = pool;