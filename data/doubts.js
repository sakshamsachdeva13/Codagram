const mongoose = require('mongoose')


//SCHEMA
const Schema = mongoose.Schema

const doubt = new Schema({
    dou : {type : String } ,
    userid : {type : mongoose.Schema.Types.ObjectId}
})


// EXPORTING MODEL 
module.exports = mongoose.model('userDoubts' , doubt)