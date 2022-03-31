const {Schema, model} = require('mongoose')

const Topic = new Schema({
  title : {type : String, required:true},
  description : {type : String, required:true},
  author : {type: String, required:true}
})

module.exports = model('Topic', Topic)