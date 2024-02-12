const {User} = require('../db/tables')
const {ToDo} = require('../db/tables')
const {Op} = require("sequelize")

/* создание записи в таблице ToDo
const first_task = ToDo.create({
    title:"wash dishes",
    description:"wash em until mom come",
    isDone:"now"
})
*/

class Queries {
    async create_todo(req,res){
        const {title,description,isDone}=req.body
        const task=await ToDo.create({
            title:title,
            description:description,
            isDone:isDone,
            userId:req.user.id})
        //await task.save()
        return res.json(task)
    }
    async get_all_todo(req,res){
        const todos=await ToDo.findAll()
        return res.json(todos)
    }
    async get_all_userid(req,res){
        const todos=await ToDo.findAll({
            where:{
                id:req.params.id
            }
        })
    }
    async get_todo_id(req,res){
        const todos=await ToDo.findAll({
            where:{
                [Op.and]:[
                    {id:req.user.id},
                    {id:req.params.id1}
                ]
            }
        })
        return res.json(todos)
    }
    async update_todo_id(req,res){
        const {title,description,isDone}=req.body
            const todos = await ToDo.findOne({
                id:req.params.id1
            })
            return res.json(todos)
            if (todos == undefined){
                return res.json({message:"table not select"})
            }
            //res.status(401).json({message:"Попытка обновить несуществующую запись todo"})
            if(todos.userId!==req.user.id) res.status(401).json({message:"Попытка обновить запись другого пользователя"})
            await ToDo.update({
                title:title,
                description:description,
                isDone:isDone,
                where:{
                    [Op.and]:[
                        {id:req.params.id1},
                        {userId:req.user.id}
                    ]
                }
            })
            return res.json(todos)

    }
    async delete_todo_id(req,res){
        ToDo.destroy({
            where:{
                id:req.user.id
            }
        })
        const todos=await ToDo.findOne({
            where:{
                id:req.user.id
            }
        })
        return res.json("Запись удалена:"+todos)
    }
    async delete_todo_all(req,res){
        ToDo.destroy({
            truncate:true
        })
        const todos=await ToDo.findAll()
        return res.json(todos)
    }
}

module.exports = new Queries()