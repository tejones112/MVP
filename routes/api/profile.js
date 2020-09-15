const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
const credentials = require('/Users/tejones112/Desktop/MVP/hrr47-mvp/config.js');

const router = express.Router();


const s3 = new aws.S3({
 accessKeyId: credentials.id,
 secretAccessKey: credentials.secret,
 Bucket: 'mvplocalmarket'
});


/**
 * Single Upload
 */
const artImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'mvplocalmarket',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 40000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).single('artImage');


 function checkFileType( file, cb ){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }


 router.post( '/art-Img-Upload', ( req, res ) => {
  artImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.json( { error: error } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
     } else {
      // If Success
      const imageName = req.file.key;
      const imageLocation = req.file.location;
  // Save the file name into database into profile model
  res.json( {
       image: imageName,
       location: imageLocation
      } );
     }
    }
   });
  });


module.exports = router;