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
      updatedChat.users = updatedChat.users.concat(users)
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
