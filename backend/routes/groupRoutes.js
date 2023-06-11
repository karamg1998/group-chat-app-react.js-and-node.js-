let groupController=require('../Controllers/group')
let express=require('express');
let Router=express.Router();

Router.post('/createGroup',groupController.CreateGroup);
Router.get('/getGroups',groupController.getGroup);
Router.get('/get-mem',groupController.getM);
Router.get('/isadmin',groupController.isAdmin);
Router.post('/addmem',groupController.addM);
Router.get('/make-admin',groupController.makeAdmin);
Router.get('/rem',groupController.rem);
Router.get('/delg',groupController.delG);
Router.get('/leave',groupController.leave);

module.exports=Router;