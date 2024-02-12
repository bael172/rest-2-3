const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('./conf')

/*
const sequelize = new Sequelize('rest2','postgres','0000',
{
    host: 'localhost',
    dialect:'postgres'
})
*/

const todo=sequelize.define('todo',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.TEXT, allowNull:false, defaultValue:'empty'},
    description:{type:DataTypes.TEXT},
    isDone:{type:DataTypes.BOOLEAN, defaultValue:false}},
    {
        timestaps:true
})

class User extends Model {}
User.init({
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login:{type:DataTypes.TEXT, allowNull:false},
    password:{type:DataTypes.TEXT, allowNull:false},
    role:{type:DataTypes.TEXT, defaultValue:"guest"}
},{
    sequelize,
    modelName: "user",
    tableName: 'users'
})


module.exports = {
    todo,
    User
}