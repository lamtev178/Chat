const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')
const Topic = require('../models/Topic')
const Comment = require('../models/Comment')

router.post('/topic', [
  check('title','Логин не может быть пустым').notEmpty(),
  check('description','Логин не может быть пустым').notEmpty()
], async (req,res)=>{
    try{
      const topic = req.body
      const newTopic = new Topic(topic)
      await newTopic.save()
      .then(()=>
        res.json('complete')
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
      .then(()=>
        res.json('complete')
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