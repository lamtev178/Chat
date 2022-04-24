const {Router} = require('express')
const messengerController = require('../messengerController')
const router = Router()
const userMiddleware = require('../userMiddleware')

router.post('/message', userMiddleware, messengerController.sendMessege)
router.post('/chat', userMiddleware, messengerController.createChat)
router.get('/chat', userMiddleware, messengerController.getChat)
router.post('/messageIsReaded', userMiddleware, messengerController.messIsReaded)

module.exports = router
