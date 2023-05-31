let chatController=require('../Controllers/chat')
let express=require('express');
let Router=express.Router();

Router.get('/getmessages',chatController.returnChats);
Router.post('/addchat',chatController.addChat);

module.exports=Router;