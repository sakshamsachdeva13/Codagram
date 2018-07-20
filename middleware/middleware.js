const middlewareObj = {}


//MIDDLEWHERE TO CHECK WHETHER THE USER IS LOGGES IN OR NOT ...!!
middlewareObj.isloggedin = function(req , res , next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/signin')
}  



module.exports = middlewareObj