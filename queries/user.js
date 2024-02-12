const {User} = require('../db/tables')

class Functions{
    async create_user(req,res){
        const {id,login,passwd,role} = req.body
        const smn = await User.build({
            id:id,
            login:login,
            password:passwd,
            role:role
        })
        await smn.save()
        return res.json(smn)
    }
    async edit_user(req,res){
        const {id,login,passwd,role}=req.body
        await User.update({
            id:id,
            login:login,
            password:passwd,
            role:role
        },{
            where:{
                id:req.params.id1
            }
        })
        const res = await User.findOne({
            where:{
                id:req.params.id1
            }
        })
        return res.json(res)
    }
    async del_user(req,res){
        await User.destroy({
            where:{
                id:req.params.id1
            }
        })
        const del = await User.findOne({
            where:{
                id:req.params.id1
            }
        })
        return res.json(del)
    }
    async info_user(req,res){
        const res=await User.findOne({
            where:{
                id:req.params.id1
            }
        })
        return res.json(res)
    }
}

module.exports=new Functions()