const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')
const Topic = require('../models/Topic')
const Comment = require('../models/Comment')

router.post('/topic', [
  check('title','Заголовок не может быть пустым').notEmpty(),
  check('description','Описание не может быть пустым').notEmpty()
], async (req,res)=>{
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
})
router.post('/comment', [
  check('message','Логин не может быть пустым').notEmpty()
], async (req,res)=>{
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
})
router.get('/comment', async (req,res)=>{
    try{
      const comments = await Comment.find()
      res.json(comments)
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
})
router.get('/topic', async (req,res)=>{
    try{
      const topics = await Topic.find()
      res.json(topics)
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
})

module.exports = router