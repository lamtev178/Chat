const {Schema, model} = require('mongoose')

const Chat = new Schema({
  chat : {type : String},
  users: [{type : String, required:true}],
  messages: [{
    author : {type : String, required:true},
    isReaded : {type : Boolean, default:false},
    message : {type : String, required:true},
    date : {type : String, required:true}
  }]
})

module.exports = model('Chat', Chat)