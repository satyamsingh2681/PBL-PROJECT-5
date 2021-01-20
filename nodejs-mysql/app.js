const express = require("express");
const mysql =require("mysql");
const path = require("path");
const dotenv =require("dotenv");
//const cookieParser= require('cookie-parser');

const app =express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'satyam',
    database: 'nodejs'
});
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));


app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use(cookieParser());

app.set('view engine','hbs');

db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }

})

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


app.listen(5000, ()=>{
    console.log("Server Started on port 5000");
})
