const route = require('express').Router() 
const middleware = require('../middleware/middleware')
const doubts = require('../data/doubts')
const ans = require('../data/ans')


//GETTING ALL QUESTIONS HERE 
route.get('/' , middleware.isloggedin , (req , res , next)=> {

  doubts.find().then((docs)=>{
    res.render('doubts' , {stylesheets : 'profilepage.css', items : docs })

  }) 
})




//POSTING ALL QUESTION 
route.post('/'  , middleware.isloggedin , (req , res , next)=> {

    var dou = req.body.dou
  req.checkBody('dou' , "don't leave this empty").notEmpty();
  var errors = req.validationErrors()
    
    if(errors) {
        res.render('doubts' , {errors : errors})
    } 
    else{
    const doubt = new doubts({
      dou : dou , 
      userid : req.user.id
    }) 
    doubt.save().then(result=>{
        console.log(result)
        res.redirect('/doubts')
        console.log(err)
    })
} })


// post ans here 

route.post('/:quid' , middleware.isloggedin , (req , res , next)=> {
    var answer = req.body.answer 
  req.checkBody('answer', "your answer is required").notEmpty()
  var errors = req.validationErrors()
  if(errors){

    ans.find({ douid : req.params.quid})
  .exec()
  .then( doc => {
  res.render('answer' , {quid : req.params.quid , item : doc , errors : errors})
  })
  }
  else {
  const answer1 = new ans({
    douid : req.params.quid , 
    ans : answer , 
    userid : req.user.id
  })
  answer1.save().then(result => {
    console.log(result)
    res.redirect('/profilepage')
  }).catch(err => {
    console.log(err)
  })
}
})




route.get('/:quid' , middleware.isloggedin , (req , res , next)=> {

  ans.find({ douid : req.params.quid})
  .exec()
  .then( doc => {
  res.render('answer' , {quid : req.params.quid , item : doc , stylesheets : 'profilepage.css'})
  }
)})


module.exports = route 