// Bring in modules
const express = require('express');
const passport = require('passport');
const path = require('path');

const multer = require('multer');

// Init router
const router = express.Router();

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
  limits:{fileSize: 1000000},
  fileFilter(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');


router.post('/upload', (req,res) =>{
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

// export router
module.exports = router;
