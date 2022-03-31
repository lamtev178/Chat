const User = require('./models/User')
const Role = require('./models/Role')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {secret} = require('./config')

const generateAccessToken = (id, roles)=>{
  const payload = {
    id, roles
  }
  return jwt.sign(payload, secret, {expiresIn:'24h'})
}

class authController{
  async registration(req, res){
    try{
      const error = validationResult(req)
      if(!error.isEmpty()){
        return res.status(400).json({message:'Ошибка при регистрации',error})
      }
      const {login, password} = req.body
      const candidate = await User.findOne({login})
      if(candidate){
        res.status(400).json({message:'Пользователь с таким именем уже существует'})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value:"ADMIN"})
      const user = new User({login, password:hashPassword, roles:[userRole.value]})
      await user.save()
      return res.json({message:"Complete"})
    }
    catch(e){
      console.log(e);
      res.status(400).json({message:'registration error'})
    }
  }
  async login(req, res){
    try{
      const {login, password} = req.body
      const user = await User.findOne({login})
      if(!user){
        return res.satatus(400).json({message:`Пользователя ${login} не существует`})
      }
      const validPassword = bcrypt.compareSync(password,user.password)
      if(!validPassword){
        return res.satatus(400).json({message:`Введен неверный пароль`})
      }
      const token = generateAccessToken(user._id,user.roles)
      return res.json({token, login})
    }
    catch(e){
      console.log(e);
      res.status(400).json({message:'login error'})
    }
  }
  async getUsers(req, res){
    try{
      const users = await User.find()
      res.json(users)
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
}

module.exports = new authController()