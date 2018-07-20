
const route = require('express').Router()
const mongoose = require('mongoose') 
const userpost = require('../data/userPost')
const status = require('../data/Status')
const middleware = require('../middleware/middleware')
 
route.get('/' , middleware.isloggedin ,  (req , res , next) => {
   
    userpost.find().exec().then(result => {

        status.find().exec().then( docs => {
        res.render('timeline' , {item : result , status : docs })
        }

      )  })
  

})

 module.exports = route 