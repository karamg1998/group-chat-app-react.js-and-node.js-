const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const Recruiter=sequelize.define('rec-personal',{
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
    Firm:Sequelize.STRING,
    Designation:Sequelize.STRING,
});

module.exports=Recruiter;