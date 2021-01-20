require('dotenv').config()
const express = require("express")
const app = express()
const path = require('path')
const mysql = require("mysql")
const { read } = require("fs")
app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});  

if(!db._connectCalled ) 
{
    db.connect( (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log("MYSQL Connected...")
        }
    } );
}

const { createConnection } = require("net")

app.post('/submit', function(req, res){
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

    console.log(req.body);

    var sql = "insert into registration values (null, '"+ req.body.name +"', '"+ formatted +"')";
    db.query(sql, function(err){

        if (err) throw err
  
        res.render("reg_confirm");
});

});

// Defining Routes:
app.use('/', require('./routes/pages'));

//Port:
app.listen(8005, () => {
    console.log("Server started on Port 8005");
});
