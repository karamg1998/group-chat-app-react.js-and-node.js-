const Sequelize=require('sequelize');


let sequelize=new Sequelize('Messenger','root','karamveer',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;