let controller=require('../controller/rec');
let express=require('express');
let router=express.Router();

router.get('/recinfo',controller.info);
router.post('/recinfo/update',controller.update);


module.exports=router;