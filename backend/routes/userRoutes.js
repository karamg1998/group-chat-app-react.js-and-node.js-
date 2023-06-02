const userController=require('../controller/user');
const express=require('express');
const router=express.Router();

router.get('/getuser',userController.getUser);
router.post('/adduser',userController.addUser);
router.post('/forgotpass',userController.forgotPass);
router.post('/forgotpasssuccess',userController.forgotSuccess);

module.exports=router;