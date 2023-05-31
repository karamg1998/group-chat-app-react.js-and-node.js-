const userController=require('../Controllers/user');
const express=require('express');
const router=express.Router();

router.get('/getuser',userController.getUser);
router.post('/adduser',userController.addUser);
router.get('/getusers',userController.getUsers);
router.get('/user',userController.user);
router.get('/profile',userController.profile);


module.exports=router;