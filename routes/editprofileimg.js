const multer = require('multer')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const userdata = require('../data/userdata')
const route =    require('express').Router()
const middleware = require('../middleware/middleware')

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
    api_key: '871722275327292', 
    api_secret:  'z5Xgpb2Vv5T6FNx4eEsLniwB_hI' 
  });
        
  

  route.get('/' , middleware.isloggedin ,  (req  , res )=> {
      userdata.findOne({userid : req.user.id}).then(result => {
          console.log(result)
        res.render('editprofileimg' ,{ profileimg : result })
      })
     
  })


  route.put('/' , middleware.isloggedin , upload.single('image') ,  (req , res , next) => {
      console.log(req.file)

        userdata.findOne({userid : req.user.id}).then(result => {
            console.log(result)
           cloudinary.uploader.destroy(result.profileimg.imageid).then(()=> { 
               
            cloudinary.uploader.upload(req.file.path).then(results => {
                console.log(results)
            result.profileimg.imageUrl = results.secure_url , 
            result.profileimg.imageid = results.public_id
            result.save().then(pr => {
                console.log(pr)
                res.redirect('/profilepage')
            })


        })})
          
          
        })

        
       
  }
)
        
  module.exports = route 
