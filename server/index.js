const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || '8000'
const authRouter = require('./routes/authRouter')
const app = express()

app.use(express.json())
app.use('/auth',authRouter)

const start = async () =>{
  await mongoose.connect('mongodb+srv://lamtev178:qwerty123@cluster0.u8xgn.mongodb.net/Chat?retryWrites=true&w=majority')
  app.listen(PORT, ()=> console.log('Server started on port ', PORT))
}

start()