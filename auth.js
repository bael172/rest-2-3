const jwt = require('jsonwebtoken')
import * as argon2 from 'argon2'
const {User} = require('./db/tables')

module.exports = function(req,res,next) {
    class AuthService {
        async SignUp(login,password){
            const passwdHash = await argon2.hash(password);


            return {
                user: {
                    login:userRecord.email,
                    role: userRecord.role
                }
            }
        }
    }
}