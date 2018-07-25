const express = require('express')
const path = require('path')
const app = express()
const sessions = require('express-session')
const exphbs = require('express-handlebars')
const localstrategy = require('passport-local')
const passport = require('passport')
const mongoose = require('mongoose')
const sslredirect = require('heroku-ssl-redirect')
const flash = require('connect-flash')
const bodyparser = require('body-parser')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const User = require('./data/signup')


app.use(methodOverride('_method'));

//PARSING BODY AND URL
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(sslredirect())



//AUTHENTICATION USING PASSPORT
app.use(sessions({
    secret: 'something that should not be shared',
    resave: false,
    saveUninitialized: true
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localstrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());  
  
  



//THIS WILL GET US THE INFO OF CURRENT USER LOGGED IN 
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
 });
  


 app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  // Connect Flash
  
  app.use(flash())
  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });



//SETTING UP THE VIEW ENGINE 
app.set('view engine' , 'handlebars')
app.set('views' , path.join(__dirname , 'views'))
app.engine('handlebars' , exphbs({defaultLayout : 'Layout' , layoutsDir : __dirname + '/views/Layout'}))
app.use(express.static("public"));
app.use( '/uploads' , express.static('uploads'))



//ROUTES
app.use('/' , require('./routes/signup'))
app.use('/profilepage' , require('./routes/profilepage'))
app.use('/userpost' , require('./routes/userpost'))
app.use('/signin' , require('./routes/signin'))
app.use('/signup' , require('./routes/signup'))
app.use('/doubts' , require('./routes/doubt'))
app.use('/userdata' , require('./routes/userdata'))
app.use('/userlist' , (require('./routes/userlist')))
app.use('/projectlist' , require('./routes/projectlist'))
app.use('/timeline' , require('./routes/Timeline'))
app.use('/editprofileimg' , require('./routes/editprofileimg'))


//DATABASE CONNECTION
mongoose.connect('mongodb://saksham:sak123@ds235181.mlab.com:35181/imageuploading')



//PORT...
app.listen(process.env.PORT , process.env.IP ,  () => {
    console.log('Codagram has been started')
}) 