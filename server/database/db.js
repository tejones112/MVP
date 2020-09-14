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

// ArtModel.create({title: 'Mitch', description: 'embroidery on fabric canvas', email: 'threadNBreakfast@.com', price: '$25', image: 'https://mvplocalmarket.s3-us-west-1.amazonaws.com/IMG_1482.png'
// });

//
module.exports.ArtModel = ArtModel;