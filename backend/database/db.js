const Sequelize=require('sequelize');


let sequelize=new Sequelize('messenger socket.io','root','karamveer',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;