const express = require('express')
const http = require('http');
const mongoose = require('mongoose')
const WebSocket  = require('ws')
const PORT = process.env.PORT || '8000'
const authRouter = require('./routes/authRouter')
const topicsRouter = require('./routes/topicsRouter')

const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth',authRouter)
app.use('/alltopics',topicsRouter)

const server = http.createServer(app);
const wss = new WebSocket.Server ({server: server, path: '/message'});

wss.on('connection', ws => {
  ws.on('message', data => {
    console.log('received: %s', data);
  });

  ws.on("error", e => ws.send(e));
  ws.send('Something from server');
});


const start = async () =>{
  await mongoose.connect('mongodb+srv://lamtev178:qwerty123@cluster0.u8xgn.mongodb.net/Chat?retryWrites=true&w=majority')
  server.listen(PORT, ()=> console.log('Server started on port ', PORT))
}

start()