let controller=require('../controller/applied');
let express=require('express');
let router=express.Router();

router.post('/job/apply',controller.apply);
router.get('/appliedjobs',controller.getApplied);
router.get('/getappliers',controller.appliers);


module.exports=router;