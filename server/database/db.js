const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/local-market', {useNewUrlParser: true});

const artSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String
  },
  price: Number
});

const ArtModel = mongoose.model('ArtModel', artSchema);

module.exports.ArtModel = ArtModel;