const mongoose = require('mongoose')
const route = require('express').Router()
const userdata = require('../data/userdata')


route.get('/' ,(req , res , next)=> {
    
    userdata.find().exec()
    .then(doc => 
       

    res.render('userlist'  , {item : doc})

    ).catch(err => console.log(err))

})

route.get('/:stuid' , (req , res , next) => {

    res.render('studentrating' , {stuid : req.params.stuid})
})

route.post('/:stuid' , async (req , res , next)=> {
       
     await userdata.findByIdAndUpdate(req.params.stuid , 
        {$push : { "teacherrating" : {id : req.user.id , rating : req.body.rating}} ,
              "sempercentage" : {percentage : req.body.percentage}})
      .then( 
              result => {
                  console.log(result)
                  res.redirect('/userlist')
              }
      ).catch(err => {
          console.log(err)
      })
})


module.exports = route