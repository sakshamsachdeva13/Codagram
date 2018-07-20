const route = require('express').Router() 
const userdata = require('../data/userdata')
const friendlist = require('../data/friends')
const mongoose = require('mongoose')
const User = require('../data/signup')
const middleware = require('../middleware/middleware')





 //RENDERING PROFILEPAGE 
 route.get('/' , middleware.isloggedin,  (req , res)=> {
 
  userdata.find({userid : req.user.id}).exec().then(result => { 
  User.find({category : 'student'}).exec().then(results => {
    res.render('profilepage' , {title :'profilepage' ,
    username : req.user.username ,
     rank : "1" ,
      stylesheets : "profilepage.css",
      script : 'charts.js' ,
         profileimg : result[0].profileimg , 
         user : results
   
      })
  })
  }).catch(err => {
    console.log(err)
  })
  

})


//Providing data to the front end javascript 
route.get('/user'  , (req , res , next) => {
  userdata.find().then(data => res.json({ success: true, data : data }));
})



    

    //GETING USER BY ID 
    route.get("/:userid" ,middleware.isloggedin ,  (req , res , next) => {
      const id = req.params.userid;
      userdata.findById(id)
      .exec()
      .then(doc => {
          res.render('profilepage')
        if(doc) {
          res.status(200).json(doc)
        }
        else {
          res.status(404)
          .json({message : "No valid entry found for provided id "})
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error : err})
      })
    })




 //EXPORTING ROUTES
 module.exports = route 