const Chat = require('./models/Chat')
const User = require('./models/User')
const uuid = require('uuid')

class messengerController {
  async sendMessege(req, res) {
    try{
      const {message, chat} = req.body
      message.author =  req.user.login
      const forChat = await Chat.findOne({chat})
      forChat.messages.push(message)
      await forChat.save()
        .then(data=>{
          res.json({message:'complete', data:data})
        }
        )
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
  async delChat(req, res){
    try{
      const {chatId} = req.params
      await Chat.deleteOne({chat:chatId})
      res.json({message:'complete'})
    }catch(error){
      console.log(error)
      res.status(400)
    }
  }
  async delUserFromChat(req,res){
    try{
      const {chatId, userId} = req.params
      const chat = await Chat.findOne({chat:chatId})
      if(userId === req.user.login || req.user.login === chat.users[chat.users.length-1]){
        chat.users = chat.users.filter(user => user !== userId)
        if(chat.users.length === 0){
          Chat.deleteOne({chat:chatId}, function (err) {
            if (err){
              console.log("err while deleted!!!!!");
              return
            }
            }
          )
          res.json({message:'complete', data:false})
        }
        await chat.save()
          .then(data =>
            res.json({message:'complete', data:data})
          )}
      else {
        res.status(400)
        res.json({message:"Вы не являетесь создателем беседы"})
      }
    }catch(e){
      console.log(e)
      res.status(400)
    }
  }
  async createChat (req, res) {
    try{
      const chat = req.body
      const user =  req.user
      chat.chat = uuid.v4()
      chat.users.push(user.login)
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
  }
  async addUserToChat (req, res) {
    try{
      const {chatId, users} = req.body
      const updatedChat =  await Chat.findOne({chat:chatId})
      updatedChat.users = users.concat(updatedChat.users)
      await updatedChat.save()
        .then(data=>
          res.json({message:'complete', data:data})
        )
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
  async getChat (req, res){
    try{
      const user =  req.user
      let chat = await Chat.find()
      chat = chat.filter(c => c.users.indexOf(user.login) !== -1)
      res.json(chat)
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
  async messIsReaded (req, res) {
    try{
      const {chatId} = req.body
      const user =  req.user.login
      const findUser = await User.findOne({login:user})
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
  }
}


module.exports = new messengerController()
