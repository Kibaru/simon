// Bring in modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const multer = require('multer');

// Import database
const config = require('./config/database');


// Bring in routers
const users = require('./routes/users');
const books = require('./routes/books');

// Db connection
mongoose.connect(config.database);

// Check success connection
mongoose.connection.once('open', ()=>{
  // console.log('connected to db ');
})

// Check connection error
mongoose.connection.on('error', ()=>{
  // console.log('connection error: '+err);
})

// init app
const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Bring passport strategy
require('./config/passport')(passport);


// Users Router
app.use('/users', users);

// Books Router
app.use('/books', books);


// ejs
app.set('view engine', 'ejs');

// public folder
app.use(express.static('./public'));

// public folder
app.use( express.static('./public'));

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb){
    cb(null, `${file.fieldname  }-${  Date.now()  }${path.extname(file.originalname)}`);
  }
});

// checkFileType
function checkFileType(file, cb){
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname
    (file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  }
    return cb('Error: Image only!');
}

// init upload
const upload = multer({
  storage,
  limits:{fileSize: 1024 * 1024 * 5},
  fileFilter(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// index route
app.get('/', passport.authenticate('jwt',{session:false}), (req, res) => res.render('index'));

app.post('/upload', (req,res) =>{
  upload(req, res, (err) =>{
    if(err){
      res.render('index', {
        msg: err
      });
    }else if(req.file === undefined){
        res.render('index', {
          msg:'Error: No file selected!'
        });
      }else{
        res.render('index', {
          msg: 'File uploaded!',
          file: `uploads/${req.file.filename}`
        })
      }
  })
});

// port
app.listen(3000, () =>{})
