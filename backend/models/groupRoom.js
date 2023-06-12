const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const groupRoom=sequelize.define('groupRoom',{
    id:{type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    },
    groupName:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports=groupRoom;