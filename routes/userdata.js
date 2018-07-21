const route = require('express').Router()
const userdata = require('../data/userdata') 
const middleware = require('../middleware/middleware')
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary')

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
        
  


route.get('/' , middleware.isloggedin ,  (req , res , next)=> {
    
    res.render('userdata')
     
    
})
 route.get('/edit' , middleware.isloggedin , (req , res , next)=> {
      userdata.find({userid : req.user.id}).exec().then(result => {

        res.render('userdataedit' , {item : result })
      })
 })





route.post('/edit' , middleware.isloggedin  , (req , res , next)=> {
      const name = req.body.name ;
      const gender = req.body.gender ;
      const college_name = req.body.college ;
      const age = req.body.age ;
      const country = req.body.country ;
      const username = req.body.username ;
      const email = req.body.email ;
      
    userdata.findOneAndUpdate({userid : req.user.id} ,
    {$set : {name : name  , 
             gender : gender  , 
             college_name : college_name , 
             age : age , 
             email : email ,
             country : country , 
            
             username : username
    }}
    ).then(result => {
        
        res.redirect('/profilepage')
    }).catch(err => {
        console.log(err)
    })
})

route.post('/' , middleware.isloggedin ,upload.single('profileimage'), (req, res , next)=> {

      
  
    var name = req.body.name 
    var gender = req.body.gender 
    var email = req.body.email
    var username = req.body.username 
    var profileimg = req.body.username
    var country = req.body.country 
    var age = req.body.age 
    var college = req.body.college

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('gender', 'gender is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'not a valid email').isEmail();
    req.checkBody('username', 'Name is required').notEmpty();

    req.checkBody('age', 'enter your age').notEmpty();
    req.checkBody('college', 'college is required').notEmpty();

   var errors = req.validationErrors();
   if(errors) {
       res.render('userdata' , {
           errors : errors
       })
   }

   else {  
    cloudinary.uploader.upload(req.file.path).then(result => {
              
        userdata.findOne({username : username} , (err , user)=> {
            if(user) {
                res.render('usedata' , {user : user})
            }
    
            else {
                 
        new userdata ({
             
            name  : name ,
            gender : gender ,
            college_name : college ,
            country : country , 
            age : age , 
            email : email , 
            userid : req.user.id, 
            profileimg : {
                imageUrl : result.secure_url , 
                imageid :  result.public_id
            }   , 
            username : username
     }).save().then((result) => {
         
         
         res.redirect('/profilepage')
          
         }).catch(err => console.log(err))
            }
        })
    
    })


 } } 
)


    
    route.get('/viewprofile' , middleware.isloggedin , (req , res , next)=> {
        
     userdata.find({userid : req.user.id}).exec()
     .then(docs => {
        
       res.render('viewprofile' , {item : docs } )
     })
     .catch(err => {
       console.log(err)
       res.status(200).json({
         error: err
       })
     })
    })

    module.exports = route 

