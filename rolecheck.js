const jwt = require('jsonwebtoken')
const {User} = require('./db/tables')



module.exports = function(){
    return function(req,res,next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.auth.split(' ')[1]
        if(!token){
            return res.status(401).json({message:"Не авторизован, отсутствует токен"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        //decoded = User
        if(decoded.role =="guest"){
            return res.status(403).json({message:"Авторизируйтесь чтобы получить доступ"})
        }

        req.user = decoded
        next()
    }
    catch(e) {
        res.status(401).json({message:"Не авторизован: другая причина"})
    }
}
}