const User = require('./models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

module.exports = (req, users) => {
  const token = req.url.slice(10)
  if(!token){
    return 'Error'
  }
  const decodedData = jwt.verify(token, secret, (err, res) => { 
    if(err)
      return 'Error'
    else 
      return res
  })
  return decodedData.login
}