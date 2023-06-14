const userController=require('../Controllers/user');
const express=require('express');
const router=express.Router();

router.get('/getuser',userController.getUser);
router.post('/adduser',userController.addUser);
router.get('/getusers',userController.getUsers);
router.get('/profile',userController.profile);
router.get('/forgot',userController.forgot);
router.get('/forgot/success',userController.success);


module.exports=router;