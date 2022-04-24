const Topic = require('./models/Topic')
const Comment = require('./models/Comment')

class topicsController{
  async createTopic(req,res) {
      try{
        const topic = req.body
        const newTopic = new Topic(topic)
        await newTopic.save()
        .then(data=>
          res.json({message:'complete', data:data})
        )
      }
      catch(e){
        console.log(e);
        res.status(400).json({message:'Post topic error'})
      }
  }
  async createComment(req,res){
      try{
        const comment = req.body
        const newComment = new Comment(comment)
        await newComment.save()
        .then(data=>
          res.json({message:'complete', data:data})
        )
      }
      catch(e){
        console.log(e);
        res.status(400).json({message:'Post comment error'})
      }
  }
  async getComment(req,res){
      try{
        const comments = await Comment.find()
        res.json(comments)
      }
      catch(e){
        console.log(e);
        res.status(400)
      }
  }
  async getTopic(req,res){
      try{
        const topics = await Topic.find()
        res.json(topics)
      }
      catch(e){
        console.log(e);
        res.status(400)
      }
  }
}
module.exports = new topicsController()
