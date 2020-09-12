const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();
// app.use(cors());
// app.use(bodyParser.urlencoded({extended: true, useUnifiedTopology: true}));
app.use(bodyParser.json());
app.use('/local-market', express.static(path.join(__dirname + '/../public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}` );
});