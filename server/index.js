const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
// const imgModel = require('./model')
const port = process.env.PORT || 3000;
const ArtModel = require('./database/db.js');


const app = express();
// app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/local-market', express.static(path.join(__dirname + '/../public')));
// app.set('view engine', 'ejs');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// var upload = multer({storage: storage});









app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}` );
});