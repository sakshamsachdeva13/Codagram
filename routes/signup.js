const route = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const path = require('path')


const User = require('../data/signup')
route.get('/' , (req , res)=> {
    res.render('signup' , {title : 'signup' , stylesheets : "signin.css"})
})

route.post('/', (req, res, next) => {

    const username = req.body.username 
    const password = req.body.password
    req.checkBody('username' , 'username is required').notEmpty()
    req.checkBody('password' , 'password is required').notEmpty()

    var error = req.validationErrors()

    if(error) {

        res.render('signup' , {errors : error ,  stylesheets : "signin.css"})
    }
    else {
    const user = new User({ username :  req.body.username , category : req.body.category })

      User.register(user , req.body.password , (err , user)=> {
          if(err)
          {     
              console.log(err)
              return res.render('signup' , {'error' : err.message ,  stylesheets : "signin.css"})
          }
          else 
          {    
            
              console.log(user)
              passport.authenticate('local')(req , res, ()=> {

                if(user.category == 'teacher')
                  {  
                      res.redirect('/userlist')
                }
                else{

                res.redirect('/userdata')
                }
              })
          }
      })
} });



module.exports = route 