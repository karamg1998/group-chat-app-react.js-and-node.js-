const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const Applied=sequelize.define('applied',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    jobName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    location:Sequelize.STRING,
    graduation:Sequelize.STRING,
    experience:Sequelize.STRING,
    recruiter:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Applied;