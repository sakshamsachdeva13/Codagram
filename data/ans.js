const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ans = new Schema({
    douid : {type : mongoose.Schema.Types.ObjectId} , 
    ans : String , 
  userid : {type : mongoose.Schema.Types.ObjectId} 

})

module.exports = mongoose.model('answers' , ans)