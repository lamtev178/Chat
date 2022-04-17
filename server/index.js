const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || '8000'
const authRouter = require('./routes/authRouter')
const topicsRouter = require('./routes/topicsRouter')
const messengerRouter = require('./routes/messengerRouter')
const WebSocket  = require('ws')
const wsUserVerify  = require('./wsUserVerify')
const Chat  = require('./models/Chat')
const http = require('http');
let users = []

const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/alltopics', topicsRouter)
app.use('/messenger', messengerRouter)
const server = http.createServer(app);
const wss = new WebSocket.Server ({server: server, path:"/ws"});

wss.on('connection', (ws, req) => {
  const user = {user:wsUserVerify(req, users), socket:ws}
  if(user.user=="Error")
    ws.close();
  if(users.length==0)
   users.push(user)
  if(users.filter(u => u.user===user.user).length===0)
    users.push(user)
  console.log(users);
  ws.on('message', async data => {
    data = JSON.parse(data)
    data.message.author= user.user
    console.log("Получены данные = ",data);
    const forChat = await Chat.findOne({chat:data.chat})
    forChat.users.forEach(u =>{
      users.forEach(us=>{
      if(u===us.user && us.user!==user.user){
        console.log(us.user);
        (us.socket).send(JSON.stringify(forChat))
      }
    })
    })
  });
  ws.on("error", e => ws.send(e));
  ws.on('close', ()=> {
    users = users.filter(u => u.user!==user.user)
    console.log(users, user.user);
  })
});

const start = async () =>{
  await mongoose.connect('mongodb+srv://lamtev178:qwerty123@cluster0.u8xgn.mongodb.net/Chat?retryWrites=true&w=majority')
  server.listen(PORT, ()=> console.log('Server started on port ', PORT))
}

start()