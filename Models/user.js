const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://car-asm:9898555808@carasm.a0pgn.mongodb.net/carAsm");

const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  isAdmin:{
    type:Boolean,
    default:false
  }
});



module.exports = mongoose.model('user' , userSchema);