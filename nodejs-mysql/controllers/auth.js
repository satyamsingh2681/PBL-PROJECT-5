
const mysql = require("mysql");
//const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'satyam',
    database: 'nodejs'
});

exports.login=(req, res)=>{
  try {
    const{email,password}=req.body;
    if(!email || !password){
      return res.status(400).render('login',{
        message:'Please provide an email and password'
      })
    }

    db.query ('SELECT * FROM users WHERE email=?',[email],async(error, results)=> {
      console.log(results);
      if(!results || !(await bcrypt.compare(password, results[0].password) ) ){
      res.status(401).render('login',{
        message:'Email or Password is incorrect'
      })
    }
      else{
        const id= results[0].id; 
        //const token = jwt.sign({id}
          //, process.env.JWT_SECRET,{
         // expiresIn: process.env.JWT_EXPIRES_IN
        //);


        //console.log("The token is :" + token);
       // const cookieOptions = {
         // expires:new Date(
           // Date.now() +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          //),
          //httpOnly: true
        //}
        //res.cookie('jwt',token,cookieOptions);
        res.status(200).redirect("/");

      }
   })

  }
  catch(error){
    console.log(error) 
    {
      console.log(error);
    }
  }

}

exports.register = (req, res)=>
{
  console.log(req.body);
    const {name, email, password, passwordConfirm} = req.body;
  
  db.query('SELECT email from users WHERE email=?',[email],async(error, results)=>{
      if(error){
          console.log(error);
      }
      if(results.length>0){
          return res.render('register',{
              message: 'That email is already in use'
          })
            }
          else if(password !==passwordConfirm){
              return res.render('register',{
              message:'Password do not match'
              });
          }


          let hasedPassword = await bcrypt.hash(password,8);
          console.log(hasedPassword);
    db.query('INSERT INTO users SET ?',{name: name,email: email,password: hasedPassword},(error, result)=>{
      if(error){
        console.log(error);
      }else{
        console.log(results);
        return res.render('register',{
          message:'User Registerd'
          
        });
      }
    })
  });

}