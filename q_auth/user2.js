const {User} = require('../db/tables')
const jwt = require('jsonwebtoken')

const generateJwt = (id,login,role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class Functions{
    /*
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
    */
    async info_user(req,res){
        const answer=await User.findOne({
            where:{
                id: req.user.id
            }
        })
        return res.json(answer)
    }
    async edit_user(req,res){
        console.log(req.user)
        const {login,passwd,role}=req.body
        await User.update({
            login:login,
            password:passwd,
            role:role
        },{
            where:{
                id : req.user.id
            }
        })
        const user = await User.findOne({
            where:{
                id : req.user.id
            }
        })
        const token = generateJwt(user.id,user.login,user.role)
        return res.json({token})

    }
    async del_user(req,res){
        await User.destroy({
            where:{
                id : req.user.id
            }
        })
        const del = await User.findOne({
            where:{
                id : req.user.id
            }
        })
        return res.json(del)
    }
    async trunc_user(req,res){
        await User.destroy({
            truncate:true
        })
        return res.json("Таблица User опустошена")
    }

}

module.exports=new Functions()