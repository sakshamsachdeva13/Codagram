const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const userImage = new Schema ({
    
    caption : String ,
    UserImage : {
      imageUrl : String ,
      imageid : String
    } , 
    userid : {
                  type : mongoose.Schema.Types.ObjectId ,
                } , 
                username : String
})

module.exports = mongoose.model('userImage' , userImage)