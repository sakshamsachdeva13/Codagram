const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectlist = new Schema({

    projectlink : {type : String} , 
    projectname : String , 
    userid : {type : mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model('projectlist' , projectlist)