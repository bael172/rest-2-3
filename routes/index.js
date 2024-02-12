const Router = require('express')
const router = new Router()

const todo1 = require('./todoRoutes')
const user1 = require('./userRoutes')

router.use('/todo',todo1)
router.use('/user',user1)

module.exports = router