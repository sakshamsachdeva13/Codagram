const route = require('express').Router()
const multer = require('multer')
const Image = require('../data/userPost')
const Status = require('../data/Status')
const middleware = require('../middleware/middleware')
const path = require('path')
const cloudinary = require('cloudinary')
require('dotenv').config()


//RENDERING USERPOST PAGE 
route.get('/' , middleware.isloggedin , (req , res , next)=> {
    res.render('userpost' , {stylesheets : "userpost.css" , script : "userpost.js" , userpost : true })
})







//STORING IMAGE IN UPLOADS FOLDER USING MULTER 

var storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });
  var imageFilter = function (req, file, cb) {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter})
  
  
  cloudinary.config({ 
    cloud_name: 'codagram', 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLOUDINARY_SECRET  
  });
        
  



   


   //UPLOADING IMAGE 
   route.post('/uploads', middleware.isloggedin , upload.single('UserImage') , (req , res , next )=> {

  cloudinary.uploader.upload(req.file.path).then(result => {

    
    const image = new Image ({
        caption : req.body.caption ,
        UserImage : {
            imageUrl : result.secure_url , 
            imageid : result.public_id 
        }   ,
        userid : req.user.id , 
        username : req.user.username
        
    }) 
    image.save().then(result=> {
        res.redirect('/timeline')
    }).catch(err=>{
        console.log(err)
    })
})

   }) 







  //UPDATING STATUS 
   route.post('/status', middleware.isloggedin , (req , res , next) => {
       const content = req.body.content
    req.checkBody('content' , 'please write something').notEmpty();
    var errors = req.validationErrors()
    if(errors) {
        res.render('userpost' , {errors : errors , userpost : true  })
    } 
    else{
       const status = new Status ({
           content : req.body.content , 
           userid : req.user.id , 
          username : req.user.username
       }) 
        status.save()
        .then((result)=> {
           
        
            res.redirect('/profilepage')
            
        }).catch(err => console.log(err))
    }
   })  

    route.delete('/:id' , middleware.isloggedin , (req , res)=> {
        Image.findById(req.params.id).then(result => {
            
            cloudinary.uploader.destroy(result.UserImage.imageid).then(() => {
                   result.remove().then(() => {
                       console.log('image has been succesfully deleted')
                   })
                res.redirect('back')
            })
        })
    })





  // GETTING IMAGES FROM DATABASE
   route.get('/uploads' , middleware.isloggedin , (req , res , next)=> {
       Image.find({userid : req.user.id}).exec().then(doc => {
                
             res.render('post' , {image : doc , stylesheets : "postview.css" , username : req.user})
       })
   })

   
  module.exports = route 