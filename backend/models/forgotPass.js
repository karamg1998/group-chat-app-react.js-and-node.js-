const Sequelize=require('sequelize');
const sequelize=require('../database/db');

const Forgot=sequelize.define('forgot',{
    id:{type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
   active:{
    type:Sequelize.STRING,
    allowNull:false
   }
});

module.exports=Forgot;