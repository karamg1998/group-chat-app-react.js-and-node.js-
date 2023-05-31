const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const Room=sequelize.define('room',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    UserId1:{
        type:Sequelize.INTEGER,
        allowNull:false,
        
    },
    UserId2:{
        type:Sequelize.INTEGER,
        allowNull:false,
        
    }
});

module.exports=Room;