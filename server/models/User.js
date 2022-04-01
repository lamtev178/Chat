const {Schema, model} = require('mongoose')

const User = new Schema({
  login : {type : String, unique:true, required:true},
  password : {type : String, required:true},
  roles : [{type : String, ref:'Role'}],
  email : {type: String, required:true, unique:true},
  activationLink : {type: String},
  isActivated : {type: Boolean, default:false},
})

module.exports = model('User', User)