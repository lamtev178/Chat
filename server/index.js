const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || '8000'
const authRouter = require('./routes/authRouter')
const topicsRouter = require('./routes/topicsRouter')
const messengerRouter = require('./routes/messengerRouter')

const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/alltopics', topicsRouter)
app.use('/messenger', messengerRouter)


const start = async () =>{
  await mongoose.connect('mongodb+srv://lamtev178:qwerty123@cluster0.u8xgn.mongodb.net/Chat?retryWrites=true&w=majority')
  app.listen(PORT, ()=> console.log('Server started on port ', PORT))
}

start()