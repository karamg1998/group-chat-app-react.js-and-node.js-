const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const Personal=sequelize.define('personal',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    phone:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    College:Sequelize.STRING,
    Graduation:Sequelize.STRING,
    specialization:Sequelize.STRING,
    Skill1:Sequelize.STRING,
    Skill2:Sequelize.STRING,
    Skill3:Sequelize.STRING,
    Skill4:Sequelize.STRING,
    Skill5:Sequelize.STRING
});

module.exports=Personal;