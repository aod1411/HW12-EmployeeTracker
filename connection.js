// Importing 'dotenv' to store private info
require("dotenv").config();
const mysql = require('mysql');
const util = require('util');

// creating credentials to connect the DB (MySQL)
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", 
    port: "3306",
    password: "root",
    database: "employees_db"
})

// if credentials don't work this throws an error message
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return; 
    }
});
// Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.
connection.query = util.promisify(connection.query)

module.exports = connection;