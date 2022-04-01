const {Router} = require('express')
const router = Router()
const authController = require('../authController')
const {check} = require('express-validator')

router.post('/registration', [
  check('login','Логин не может быть пустым').notEmpty(),
  check('password','Пароль должен быть длиннее 6 и короче 16 символов').isLength({min:6, max:16})
], authController.registration)
router.get('/activation/:link', authController.activation)
router.post('/login', authController.login)
router.get('/users', authController.getUsers)

module.exports = router