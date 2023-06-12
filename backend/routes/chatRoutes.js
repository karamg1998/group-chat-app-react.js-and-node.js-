let chatController=require('../Controllers/chat')
let express=require('express');
let Router=express.Router();

Router.get('/getmessages',chatController.returnChats);
Router.get('/group/getm',chatController.getM);
Router.get('/room',chatController.getRoom);

module.exports=Router;