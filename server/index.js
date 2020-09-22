const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');
const credentials = require('../config.js');
const mongoModel = require('./database/db.js');


const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/local-market', express.static(path.join(__dirname + '/../public')));
app.set('view engine', 'ejs');




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

app.post('/api/local-market/', (req, res) => {
  mongoModel.ArtModel.create(req.body, (error, newArt) => {
    if (error) {
      res.status(500).send();
    } else {
      res.send('Art Created');
    }
  })
})


const profile = require('../routes/api/profile' );
app.use( '/api/profile', profile );





app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}` );
});