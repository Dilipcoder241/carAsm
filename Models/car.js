const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
  carName:String,
  manufacturedYear:String,
  price:String,
  imgsrc:String
});



module.exports = mongoose.model('car' , carSchema);