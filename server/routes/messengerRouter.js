const {Router} = require('express')
const Chat = require('../models/Chat')
const User = require('../models/User')
const uuid = require('uuid')
const router = Router()
const userMiddleware = require('../userMiddleware')

router.post('/message', userMiddleware, async (req, res) => {
  try{
    const {message, chat} = req.body
    const user =  req.user
    if(user.login !== message.author){
      res.status(404).json({message: 'Not your acc'})
    }
    const forChat = await Chat.findOne({chat})
    forChat.messages.push(message)
    await forChat.save()
      .then(data=>
        res.json({message:'complete', data:data})
      )
  }
  catch(e){
    console.log(e);
    res.status(400)
  }
})
router.post('/chat', userMiddleware, async (req, res) => {
  try{
    const chat = req.body
    const user =  req.user
    if(user.login!==chat.login){
      res.status(404).json({message: 'Not your acc'})
    }
    chat.chat = uuid.v4()
    const newChat = new Chat(chat)
    await newChat.save()
      .then(data=>
        res.json({message:'complete', data:data})
      )
  }
  catch(e){
    console.log(e);
    res.status(400)
  }
})
router.get('/chat', userMiddleware, async (req, res) =>{
  try{
    const {login} = req.body
    const user =  req.user
    const findUser = await User.findOne({login})
    if(findUser.login !== user.login){
      res.status(404).json({message: 'Not your acc'})
    }
    let chat = await Chat.find()
    chat = chat.filter(c => c.users.indexOf(login) !== -1)
    res.json(chat)
  }
  catch(e){
    console.log(e);
    res.status(400)
  }
})
router.post('/messageIsReaded', userMiddleware, async (req, res) =>{
  try{
    const {login, chatId} = req.body
    const user =  req.user
    const findUser = await User.findOne({login})
    if(findUser.login !== user.login){
      res.status(404).json({message: 'Not your acc'})
    }
    const chat = await Chat.findOne({chat:chatId})
    chat.messages.forEach((mess) => {
      if(mess.author !== findUser.login){
        mess.isReaded = true
      }
    })
    await chat.save()      
    .then(data=>
        res.json({message:'complete', data:data})
    )
  }
  catch(e){
    console.log(e);
    res.status(400)
  }
})


module.exports = router