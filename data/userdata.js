
const mongoose = require('mongoose')


 const Schema = mongoose.Schema
const  Userdata = new Schema({
       
    name  : String ,
       gender : String ,
       college_name : String ,
       country : String ,
       gender : String , 
        age : Number , 
        email : String , 
        profileimg : {
            imageUrl : String , 
            imageid : String
        } ,
        userid : { 
            type : mongoose.Schema.Types.ObjectId 
        } , 
        
         teacherrating: [ {
                  
                teacherid : {type : mongoose.Schema.Types.ObjectId} , 

                rating : Number 
         }] , 
         projectrating : [{
                studentid : {type : mongoose.Schema.Types.ObjectId} , 

                studentrating : Number
         }] , 

         sempercentage : {
                 percentage : Number
         } , 

         username : String

         
    
})



module.exports = mongoose.model('userdata' , Userdata)

