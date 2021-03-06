const {Router} = require('express')
const router = Router()
const authController = require('../authController')
const {check} = require('express-validator')

router.post('/registration', [
  check('login','Логин не может быть пустым. ').notEmpty(),
  check('password','Пароль должен быть длиннее 6 и короче 16 символов. ').isLength({min:6, max:16})
], authController.registration)
router.get('/activation/:link', authController.activation)
router.post('/login', [  check('login','Логин не может быть пустым. ').notEmpty(),
  check('password','Пароль должен быть длиннее 6 и короче 16 символов. ').isLength({min:6, max:16})], authController.login)
router.get('/users', authController.getUsers)
router.post('/addsub', authController.addSub)

module.exports = router