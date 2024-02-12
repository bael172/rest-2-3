const Router = require('express')
const router = new Router()

const user1 = require('../q_auth/user1')
const user2 = require('../q_auth/user2')

const token = require('../check/tokenCheck')
const role = require('../check/roleCheck')

router.post('/reg',user1.registration)
router.post('/login',user1.login)
router.get('/check',user1.check)

router.get('/info',token,user2.info_user)
router.patch('/edit',token,user2.edit_user)
router.delete('/delete',token,user2.del_user)
router.delete('/trunc',role,user2.trunc_user)


module.exports = router