const mongoose = require('mongoose')

//SCHEMA
const Schema = mongoose.Schema 
  const status = new Schema({

    content : { type : String} , 
   userid  : {type : mongoose.Schema.Types.ObjectId} , 
   username : String
  }) 

  //EXPORTING MODEL
  module.exports = mongoose.model('UserStatus' , status )