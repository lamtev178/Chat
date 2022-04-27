const {Router} = require('express')
const messengerController = require('../messengerController')
const router = Router()
const userMiddleware = require('../userMiddleware')

router.post('/message', userMiddleware, messengerController.sendMessege)
router.post('/chat', userMiddleware, messengerController.createChat)
router.delete('/chat/:chatId/:userId', userMiddleware, messengerController.delUserFromChat)
router.put('/chat', userMiddleware, messengerController.addUserToChat)
router.get('/chat', userMiddleware, messengerController.getChat)
router.post('/messageIsReaded', userMiddleware, messengerController.messIsReaded)

module.exports = router
