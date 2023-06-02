let controller=require('../controller/jobController');
let express=require('express');
let router=express.Router();

router.post('/job/post',controller.postJob);
router.get('/job/yourjobs',controller.getJobs);
router.get('/job/:Id',controller.getJob);
router.post('/job/update',controller.update);
router.delete('/job/del/:Id',controller.delete);
router.get('/alljobs',controller.allJobs);


module.exports=router;