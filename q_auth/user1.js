const {User} = require('../db/tables')
const ApiError = require('../apiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id,login,role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class Authorization{
    async registration(req,res,next){
        const {login,passwd,role} = req.body
        if(!login || !passwd){
            return res.send('Некорректный логин или пароль')
        }
        const candidate = await User.findOne({where:{login}})
        if(candidate) {
            return res.send("Пользователь с таким логином уже существует")
        }
        const hashpasswd = await bcrypt.hash(passwd,5) //кодирование папроля
        const userok = await User.create({
            login,
            password:hashpasswd,
            role,
        })
        const token = generateJwt(userok.id, userok.login, userok.role)
        return res.json({token})
}
    async login(req,res,next){
        const {login,passwd} = req.body
        const user = await User.findOne({where:{login}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(passwd, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJwt(user.id,user.login,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        res.json({message:"All right"})
    }
}
module.exports = new Authorization()