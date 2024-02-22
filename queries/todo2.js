const {ToDo} = require('../db/tables')

class List{
    async my_todos(req,res){
        const my_todos = await ToDo.findAll({
            where:{
                userId:req.user.id
            }
        })
        return my_todos
    }

    async get_done(req,res){
        try{
            const done = my_todos().findAll({
                where:{
                    isDone:true,
                }
            })
            return res.json(done)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }

    async get_undone(req,res){
        try{
            const undone = my_todos().findAll({
                where:{
                    isDone:false,
                }
            })
            return res.json(undone)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }

    async get_done_first(req,res){
        try{
            const done_first = my_todos().findAll({
                where:{
                    id:req.user.id
                },
                order:[
                    ["isDone","DESC"] //сначала true
                ]
            })
            return res.json(done_first)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }

    async get_undone_first(req,res){
        try{
            const undone_first = my_todos().findAll({
                where:{
                    id:req.user.id
                },
                order:[
                    ["isDone","ASC"] //сначала false
                ]
            })
            res.json(undone_first)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }

    async get_new(req,res){
        try{
            const new_first = my_todos().findAll({
                where:{
                    id:req.user.id
                },
                order:[
                    ["createdAt","DESC"] //самый свежий задача
                ]
            })
            return res.json(new_first)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }

    async get_old(req,res){
        try{
            const old_first = this.my_todos.findAll({
                where:{
                    id:req.user.id
                },
                order:[
                    ["createdAt","ASC"]  //самый старый задача
                ]
            })
            return res.json(old_first)
        }
        catch(e){
            res.status("У вас нет записей")
        }
    }
}

module.exports = new List()