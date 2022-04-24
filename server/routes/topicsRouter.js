const {Router} = require('express')
const topicsController = require("../topicsController")
const router = Router()
const {check} = require('express-validator')

router.post('/topic', [
  check('title','Заголовок не может быть пустым').notEmpty(),
  check('description','Описание не может быть пустым').notEmpty()
], topicsController.createTopic)
router.post('/comment', [
  check('message','Комментарий не может быть пустым').notEmpty()
], topicsController.createComment)
router.get('/comment', topicsController.getComment)
router.get('/topic', topicsController.getTopic)

module.exports = router
