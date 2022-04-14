const jwt = require('jsonwebtoken')
const {secret} = require('./config')

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
      res.status(403).json({message:"Пользователь не авторизован"})
    }
    const decodedData = jwt.verify(token, secret, (err, res) => { 
      if(err)
        return err 
      else 
        return res
    })
    req.user = decodedData
    next()
  }catch(e){
    res.status(404).json({message:"Error"})
  }
}