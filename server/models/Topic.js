const {Schema, model} = require('mongoose')

const Topic = new Schema({
  //id: {type:Number, required:true},
  title : {type : String, required:true},
  description : {type : String, required:true},
  author : {type: String, required:true}
})

module.exports = model('Topic', Topic)