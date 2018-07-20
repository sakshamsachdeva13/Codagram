const mongoose = require('mongoose')

const Schema = mongoose.Schema 

 const friends_list = new Schema ({
     friendlist : Array ,
     number : Number
 })

 module.exports = mongoose.model('friends_list' , friends_list)
 