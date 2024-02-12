const {ToDo} = require('../db/tables')

class List{
    async get_done(req,res){
        const done=await ToDo.findAll({
            where:{
                isDone:true,
                id:req.user.id
            }
        })
        res.json(done)
    }
    async get_undone(req,res){
        const undone=await ToDo.findAll({
            where:{
                isDone:false,
                id:req.user.id
            }
        })
        res.json(undone)
    }
    async get_done_first(req,res){
        const done_first = await ToDo.findAll({
            where:{
                id:req.user.id
            },
            order:[
                ["isDone","DESC"] //сначала true
            ]
        })
        res.json(done_first)
    }
    async get_undone_first(req,res){
        const undone_first = await ToDo.findAll({
            where:{
                id:req.user.id
            },
            order:[
                ["isDone","ASC"] //сначала false
            ]
        })
        res.json(undone_first)
    }
    async get_new(req,res){
        const new_first = await ToDo.findAll({
            where:{
                id:req.user.id
            },
            order:[
                ["createdAt","DESC"] //самый свежий задача
            ]
        })
        res.json(new_first)
    }
    async get_old(req,res){
        const old_first=await ToDo.findAll({
            where:{
                id:req.user.id
            },
            order:[
                ["createdAt","ASC"]  //самый старый задача
            ]
        })
        res.json(old_first)
    }
}

module.exports = new List()