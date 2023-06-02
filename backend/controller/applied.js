const job = require("../models/jobs");
const applied=require('../models/applied');
const user = require("../models/user");
const jwt = require("jsonwebtoken");

function generateToken(id) {
  return jwt.sign({ Id: id }, "hffgjhfgjhfgj");
}

function parseToken(id) {
  let parseId = jwt.verify(id, "hffgjhfgjhfgj");
  return parseId.Id;
}

exports.apply=async (req,res,next)=>{
   let userId=parseToken(req.body.userToken);
   let jobId=parseToken(req.body.jobToken);
   let name;
   let email;
   let phone;
   try{
    await user.findByPk(userId)
    .then(user=>{
        if(!user)
        {
            res.json({success:false,message:'no user found'});
        }
        else{
            name=user.name;
            email=user.email;
            phone=user.phone;
           return job.findByPk(jobId);
        }
    }).then(job=>{
        return applied.create({jobName:job.jobName,location:job.location,graduation:job.graduation,experience:job.experience,
            recruiter:job.userId,userId:userId,jobId:jobId,name:name,email:email,phone:phone});
    }).then(resp=>{
        res.json({success:true,message:'successfully applied for the job'})
    })
   }
   catch(err)
   {
    res.json(err);
   }
};

exports.getApplied=async (req,res,next)=>{
   let id=parseToken(req.header('token'));
   try{
    await user.findByPk(id)
    .then(user=>{
        if(!user)
        {
            res.json({success:false,message:'no user found'})
        }
        else{
            return applied.findAll({where:{userId:id}});
        }
    }).then(jobs=>{
        let obj=[];
             for(var i=0;i<jobs.length;i++)
             {
                obj.push({id:generateToken(jobs[i].jobId),job:jobs[i].jobName,qualification:jobs[i].graduation,
                    location:jobs[i].location,experience:jobs[i].experience});
             } 
             res.json(obj);
    })
   }
   catch(err)
   {
    res.json(err);
   }
};

exports.appliers=async (req,res,next)=>{
    let id=parseToken(req.header('token'));
try{
    await applied.findAll({where:{recruiter:id}})
    .then(resp=>{
        let obj=[];
        for(var i=0;i<resp.length;i++)
        {
            obj.push({jobName:resp[i].jobName,location:resp[i].location,name:resp[i].name,email:resp[i].email,
            phone:resp[i].phone,jobId:generateToken(resp[i].jobId)});
        }
        res.json(obj);
    })
}
catch(err)
{
    res.json(err);
}
};