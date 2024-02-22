const ApiError = require('../apiError')
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
    async create_todo(req,res,next){
        try{
            const {title,description,isDone}=req.body
            const task = await ToDo.create({
                title:title,
                description:description,
                isDone:isDone,
                userId:req.user.id})
            //await task.save()
            return res.json(task)
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async get_all_todo(req,res,next){
        try{
            const todos = await ToDo.findAll()
            if(!todos) res.status("There're no todos")
            else return res.json(todos)
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async get_all_my(req,res,next){
        try{
            const verify = await ToDo.findAll({
                where:{
                    userId:req.user.id
                }
            })
            console.log(req.user.id)
            //console.log(verify.length)
            if(verify.length!=0){
                return res.json(verify)
            }
            else return res.status("Вы не создали ни одной записи")
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async get_one_byid(req,res,next){
        try{
            const verify = await ToDo.findAll({
                where:{
                    userId:req.user.id
                }
            })
            if(verify.length!==0){
                const todos = verify.findOne({
                    where:{
                        [Op.and]:[
                            {userId:req.user.id},
                            {id:req.params.id1}
                        ]
                    }
                })
                return res.json(todos)
            }
            else return res.json({message:"У вас нет ни одной записи"})
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async update_todo_id(req,res,next){
        try{
            const {title,description,isDone}=req.body
            const my_todo = await ToDo.findAll({
                userId:req.user.id
            })
            console.log(req.user.id)
            console.log(my_todo)
            console.log(title,description,isDone)
            if(my_todo.length != 0){
                await ToDo.update(
                    {
                        title:title,
                        description:description,
                        isDone:isDone,
                    },
                    {
                        where:{     
                            [Op.and]:[
                                {userId:req.user.id},
                                {id:req.params.id1}
                            ]
                        }
                    })
                const result = await ToDo.findOne({
                    where:{
                        id:req.params.id1
                    }
                })
                return res.json(result)
            }
            else return res.json({message:"Вы не создали ни одной записи"})
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async delete_todo_id(req,res,next){
        try{
            const check1=await ToDo.findAll({
                where:{
                    userId:req.user.id,
                }
            })
            const check2 = await ToDo.findOne({
                where:{
                    id:req.params.id1
                }
            })
            console.log("userId=",req.user.id)
            console.log("check1.length=",check1.length)
            console.log("check1 is array?",Array.isArray(check1))
            console.log("check2 is Array?",Array.isArray(check2))
            if(check1.length!==0)
            {
                if(check2)
                {
                    console.log("check2 id=",check2.dataValues.id)
                    const check2_id=check2.dataValues.id //11
        
                    const id_list=[]
                    check1.forEach(function(item,index,array){
                        console.log(item.dataValues.id) //13,14
                        id_list.push(item.dataValues.id)
                    })
                    console.log("blyat")
                    for(let key of id_list){
                        if(key==check2_id) {
                            ToDo.destroy({
                                where:{
                                    [Op.and]:[
                                        {userId:req.user.id},
                                        {id:req.params.id1}
                                    ]
                                }
                            })
                            return res.json("Запись удалена")
                        }
                        else break;
                    }
                    return res.json("Указанный id todo вам не принадлежит")
                }
                else return res.json("Под данным id ни найдена ни одная запись")
            }
            else return res.json("У вас нет еще записей")
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
    async delete_todo_all(req,res){
        try{
            let answ = confirm("Вы уверены что хотите опустошить таблицу todo?")
            if(answ){
                ToDo.destroy({
                    truncate:true
                })
            }
            const todos=await ToDo.findAll()
            return res.json("Таблица опустошена:" + todos)
        }
        catch(e){
            return next(ApiError.internal("АШИПКА"))
        }
    }
}

module.exports = new Queries()