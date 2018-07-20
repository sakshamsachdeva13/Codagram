const route = require('express').Router()
const passport = require('passport')

route.get('/' , (req , res)=> {
    res.render('signin' , {title : 'signin' , stylesheets : "signin.css"})
})

route.post('/' , passport.authenticate('local' ,{
    
    failureRedirect : '/signin'
}),(req , res)=> {
    if(req.body.category == 'teacher'){
        res.redirect('/userlist')
    } 
    else if(req.body.category == 'student'){
        res.redirect('/profilepage')
    }
}) 

route.get('/logout' , (req ,res , next)=> {
   
    req.logout()
    res.redirect('/signin')
})

module.exports = route 