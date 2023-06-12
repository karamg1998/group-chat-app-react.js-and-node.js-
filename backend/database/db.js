const Sequelize=require('sequelize');


let sequelize=new Sequelize('messenger','root','karamveer',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;