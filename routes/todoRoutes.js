const Router = require('express')
const router = new Router()

const query = require('../queries/todo')
const list = require('../queries/todo2')

const token = require('../check/tokenCheck')
const role = require('../check/roleCheck')

router.post('/create',token,query.create_todo)
router.get('/all',role,query.get_all_todo)
router.get('/all_userid/:id1',role,query.get_all_userid)
router.get('/id/:id1',token,query.get_todo_id)
router.patch('/upd_id/:id1',token,query.update_todo_id)
router.delete('/del_id',token,query.delete_todo_id)
router.delete('/del_all',role,query.delete_todo_all)

router.get('/get_done',token,list.get_done)
router.get('/get_undone',token,list.get_undone)
router.get('/get_done_first',token,list.get_done_first)
router.get('/get_undone_first',token,list.get_undone_first)
router.get('/get_new',token,list.get_new)
router.get('/get_old',token,list.get_old)

module.exports = router