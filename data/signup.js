const mongoose = require('mongoose')
const schema = mongoose.Schema ;
const passportlocal = require('passport-local-mongoose')

//USER SCHEMA
const userSchema = new schema ({
    username : String , 
    password : String , 
    category : String 
})


// SCHEMA PLUGIN
userSchema.plugin(passportlocal)
module.exports = mongoose.model('User' , userSchema)