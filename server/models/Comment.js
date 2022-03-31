const {Schema, model} = require('mongoose')

const Comment = new Schema({
  //id: {type : String, unique:true, required:true},
  author : {type : String, required:true},
  postId : {type : Number, required:true},
  message : {type : String, required:true}
})

module.exports = model('Comment', Comment)