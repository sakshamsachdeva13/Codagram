const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const PostSchema = new Schema ({
    title : String , 
    content : String 
})
const Post = mongoose.model('Post' , PostSchema)
const UserSchema = new Schema({

    name : String , 
    email: String , 
    post : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Post"
        }
    ]
})


const UserModel = mongoose.model('User' , UserSchema)


module.exports = { Post, UserModel}