const route = require('express').Router() 
const project = require('../data/projectlist')
const middleware = require('../middleware/middleware')
const userdata = require('../data/userdata')


route.get('/' , middleware.isloggedin ,  (req , res , next) => {

    project.find().exec().then(doc => {
        res.render('projectlist' , { item : doc})
    })

})

route.post('/:userid' , (req , res , next)=> {
   userdata.findOneAndUpdate({userid : req.params.userid} ,
    
    {$push : { "projectrating" : {studentid : req.user.id , studentrating : req.body.rating}}}) .then(result=> {
    console.log(result)
    res.redirect('/projectlist')
    })
})





route.post('/' , middleware.isloggedin ,(req , res , next) => {

    const name = req.body.name ;
    const link = req.body.link ; 

    req.checkBody('name' , 'name of project is required').notEmpty();
    req.checkBody('link' , 'please provide the link ').notEmpty()
    var errors = req.validationErrors()
    if(errors) {
        res.render('projectlist' , {errors : errors})
    } 
    else{
    const projectlist = new project({
        projectlink : link , 
        projectname : name , 
        userid : req.user.id 
    })

    projectlist.save()
    .then(result => {
      res.redirect('/projectlist')
    })
    .catch(err => {
        console.log(err)
    })
}
})


module.exports = route