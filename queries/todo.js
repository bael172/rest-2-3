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
        const task = await ToDo.create({
            title:title,
            description:description,
            isDone:isDone,
            userId:req.user.id})
        //await task.save()
        return res.json(task)
    }
    async get_all_todo(req,res){
        const todos = await ToDo.findAll()
        if(!todos) res.status("There're no todos")
        else return res.json(todos)
    }
    async get_all_byid(req,res){
        const verify = await ToDo.findAll({
            where:{
                userId:req.user.id
            }
        })
        if(verify){
            const todos = verify.findAll({
                where:{
                    id:req.params.id
                }
            })
            return res.json(todos)
        }
        else return res.status("Вы не создали ни одной записи")

    }
    async get_one_byid(req,res){
        const verify = await ToDo.findAll({
            where:{
                userId:req.user.id
            }
        })
        if(verify){
            const todos = verify.findOne({
                where:{
                    id:req.params.id1
                }
            })
            return res.json(todos)
        }
        else return res.status("Вы не создали ни одной записи")
        
    }
    async update_todo_id(req,res){
        const {title,description,isDone}=req.body
            const my_todo = await ToDo.findOne({
                userId:req.user.id
            })
            if(my){
                const updated = my_todo.update({
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
                return res.json(updated)
            }
            else return res.json({message:"Вы не создали ни одной записи"})
        }
    async delete_todo_id(req,res){
        const check=await ToDo.findOne({
            where:{
                userId:req.user.id
            }
        })
        if(check){
            ToDo.destroy({
                where:{
                    id:req.params.id1
                }
            })
            return res.json("Запись удалена")
        }   
        else return res.status("У вас нет ни одной записи")
        
    }
    async delete_todo_all(req,res){
        let answ = confirm("Вы уверены что хотите опустошить таблицу todo?")
        if(answ){
            ToDo.destroy({
                truncate:true
            })
        }
        const todos=await ToDo.findAll()
        return res.json("Таблица опустошена:" + todos)
    }
}

module.exports = new Queries()