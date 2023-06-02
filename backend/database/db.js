const Sequelize=require('sequelize');


let sequelize=new Sequelize('getHired','root','karamveer',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;