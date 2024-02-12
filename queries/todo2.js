const {todo}=require('../db/tables')

class List{
    async get_done(req,res){
        const done=await todo.findAll({
            where:{
                isDone:true
            }
        })
        res.json(done)
    }
    async get_undone(req,res){
        const undone=await todo.findAll({
            where:{
                isDone:false
            }
        })
        res.json(undone)
    }
    async get_done_first(req,res){
        const done_first = await todo.findAll({
            order:[
                ["isDone","DESC"]
            ]
        })
        res.json(done_first)
    }
    async get_undone_first(req,res){
        const undone_first = await todo.findAll({
            order:[
                ["isDone","ASC"]
            ]
        })
        res.json(undone_first)
    }
    async get_new(req,res){
        const new_first = await todo.findAll({
            order:[
                ["createdAt","DESC"] //самый свежий задача
            ]
        })
        res.json(new_first)
    }
    async get_old(req,res){
        const old_first=await todo.findAll({
            order:[
                ["createdAt","ASC"]  //самый старый задача
            ]
        })
        res.json(old_first)
    }
}

module.exports = new List()