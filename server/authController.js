const User = require('./models/User')
const Role = require('./models/Role')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const {secret} = require('./config')
const uuid = require('uuid')
const sendMailActivation = require('./sendMailActivation')

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
      const {login, password, email} = req.body
      const mail = await User.findOne({email})
      if(mail){
        return res.status(400).json({message:`Почта  ${mail} уже используется`})
      }
      const candidate = await User.findOne({login})
      if(candidate){
        return res.status(400).json({message:`Логин ${log} уже используется`})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value:"USER"})
      const activationLink = uuid.v4()
      const user = new User({email:email, login, password:hashPassword, roles:[userRole.value], activationLink : activationLink})
      await sendMailActivation.sendActionLink(email, `http://localhost:8000/auth/activation/${activationLink}`)
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
      const error = validationResult(req)
      console.log(error);
      if(!error.isEmpty()){
        return res.status(400).json(error)
      }
      const {login, password} = req.body
      const user = await User.findOne({login})
      console.log(user);
      if(!user){
        return res.status(400).json({message:`Пользователя ${login} не существует`})
      }
      if(!user.isActivated){
        return res.status(400).json({message:`Аккаунт не активирован`})
      }
      const validPassword = bcrypt.compareSync(password,user.password)
      if(!validPassword){
        return res.status(400).json({message:`Введен неверный пароль`})
      }
      const token = generateAccessToken(user._id,user.roles)
      return res.json({token, login, subscriptions: user.subscriptions})
    }
    catch(e){
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
  async addSub(req, res){
    try{
      const {login, subscription} = req.body
      const user = await User.findOne({login: login})
      const userSub = await User.findOne({login : subscription})
      user.subscriptions = [...user.subscriptions, userSub.login]
      await user.save()
      res.json('Complete')
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
  async activation(req, res){
    try{
      const activationLink = req.params.link
      const user = await User.findOne({activationLink:activationLink})
      if(!user){
        throw Error('User not found')
      }
      user.isActivated = true;
      await user.save()
      return res.redirect('http://localhost:3000/')
    }
    catch(e){
      console.log(e);
      res.status(400)
    }
  }
  
}

module.exports = new authController()