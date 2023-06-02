const infoController=require('../controller/personal');
const express=require('express');
const router=express.Router();

router.get('/info',infoController.personalInfo);
router.post('/updateinfo',infoController.updateInfo);

module.exports=router;