const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local-market', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) {
    console.log('ERROR CONNECTING DB');
  } else {
    console.log('DB CONNECTED');
  }
});

const artSchema = new mongoose.Schema({
  title: String,
  description: String,
  email: String,
  price: String,
  image: String
});

const ArtModel = mongoose.model('ArtModel', artSchema);


module.exports.ArtModel = ArtModel;