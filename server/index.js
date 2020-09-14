const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');
const credentials = require('../config.js');
const mongoModel = require('./database/db.js');


const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/local-market', express.static(path.join(__dirname + '/../public')));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({storage: storage});



app.get('/api/local-market/', (req, res) => {
  mongoModel.ArtModel.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log('ERROR in get request: ', err);
      res.status(500).send('ERROR');
    });

})



// app.post('/api/local-market/', upload.single('image'), (req, res, next) => {
//   console.log(req.body);
//   var obj = {
//     title: req.body.title,
//     description: req.body.description,
//     image: {
//       data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
//       contentType: 'image/png'
//     }
//   }
//   mongoModel.ArtModel.create(obj, (err, item) => {
//     if (err) {
//       console.log('ERROR CREATING DATA: ', err);
//     } else {
//       res.send('SUCCESS');
//     }
//   });
// });

// AWS.config.update({region: 'us-west-1'});


// s3 = new AWS.S3({apiVersion: '2006-03-01'});

const BUCKET = 'mvplocalmarket';
const REGION = 'us-west-1';
const ACCESSKEY = credentials.id;
const SECRETKEY = credentials.secret;

AWS.config.update({
  accessKeyId: ACCESSKEY,
  secretAccess: SECRETKEY,
  region: REGION
});

let s3 = new AWS.S3();

app.get('/api/local-market/', (req, res) => {
  mongoModel.ArtModel.find({})
    .then((data) => {
      res.send(200).json(data);
    })
    .catch((err) => {
      console.log('ERROR ON GET SERVER SIDE: ', err);
    })
})

// app.post('/api/local-market/', (req, res) => {
//   // let imageForS3 = req.body.imgage;
//   // let imageKey = `${new Date().getTime()}.png`;
//   console.log(req.body.getAll('files'));
//   // let obj = {
//   //   title: req.body.title,
//   //   description: req.body.description,
//   //   email: req.body.email,
//   //   price: req.body.price,
//   // }
//   // s3.putObject({
//   //   Bucket: BUCKET,
//   //   Body: fs.readFileSync(imageForS3),
//   //   Key: imageKey
//   // })
//   //   .promise()
//   //   .then(response => {
//   //     obj[image] = s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageKey});
//   //     return obj;
//   //   })
//   //   .catch(err => {
//   //     console.log('failed: ', err)
//   //   })
//   mongoModel.ArtModel.create(req.body, (err, item) => {
//     if (err) {
//       console.log('ERROR CREATING DATA: ', err);
//     } else {
//       res.send('SUCCESS');
//     }
//   });
// });












app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}` );
});