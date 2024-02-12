const {todo} = require('../db/tables')

/* создание записи в таблице ToDo
const first_task = todo.create({
    title:"wash dishes",
    description:"wash em until mom come",
    isDone:"now"
})
*/

class Queries {
    async create_todo(req,res){
        const {title,description,isDone}=req.body
        const task=await todo.create({title,description,isDone})
        //await task.save()
        return res.json(task)
    }
    async get_todo(req,res){
        const todos=await todo.findAll()
        return res.json(todos)
    }
    async get_todo_id(req,res){
        const todos=await todo.findAll({
            where:{
                id:req.params.id1
            }
        })
        return res.json(todos)
    }
    async update_todo_id(req,res){
        const {title,description,isDone}=req.body
        await todo.update({title:title,description:description,isDone:isDone},{
            where:{
                id:req.params.id1
            }
        })
        const todos=await todo.findOne({
            where:{
                id:req.params.id1
            }
        })
        return res.json(todos)
    }
    async delete_todo_id(req,res){
        todo.destroy({
            where:{
                id:req.params.id1
            }
        })
        const todos=await todo.findOne({
            where:{
                id:req.params.id1
            }
        })
        return res.json(todos)
    }
    async delete_todo_all(req,res){
        todo.destroy({
            truncate:true
        })
        const todos=await todo.findAll()
        return res.json(todos)
    }
}

module.exports = new Queries()