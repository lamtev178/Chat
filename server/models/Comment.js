const {Schema, model} = require('mongoose')

const Comment = new Schema({
  author : {type : String, required:true},
  postId : {type : String, required:true},
  message : {type : String, required:true}
})

module.exports = model('Comment', Comment)