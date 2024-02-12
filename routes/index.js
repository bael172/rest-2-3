const Router = require('express')
const router = new Router()

const query = require('../queries/todo')
const list = require('../queries/todo2')

router.post('/create_todo',query.create_todo)
router.get('/getall_todo',query.get_todo)
router.get('/get_todo_id/:id1',query.get_todo_id)
router.patch('/update_todo_id/:id1',query.update_todo_id)
router.delete('/delete_todo_id/:id1',query.delete_todo_id)
router.delete('/delete_todo_all',query.delete_todo_all)

router.get('/get_done',list.get_done)
router.get('/get_undone',list.get_undone)
router.get('/get_done_first',list.get_done_first)
router.get('/get_undone_first',list.get_undone_first)
router.get('/get_new',list.get_new)
router.get('/get_old',list.get_old)


module.exports = router