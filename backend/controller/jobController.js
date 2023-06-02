const job = require("../models/jobs");
const user = require("../models/user");
const applied=require('../models/applied');
const jwt = require("jsonwebtoken");
const {Op}=require('sequelize');

function generateToken(id) {
  return jwt.sign({ Id: id }, "hffgjhfgjhfgj");
}

function parseToken(id) {
  let parseId = jwt.verify(id, "hffgjhfgjhfgj");
  return parseId.Id;
}

exports.postJob = async (req, res, next) => {
  let position = req.body.position;
  let location = req.body.location;
  let qualification = req.body.qualification;
  let desc=req.body.desc;
  let experience=req.body.experience;
  let token = parseToken(req.body.token);
  try {
    await user.findByPk(token).then((user) => {
      if (!user) {
        res.json({ success: false, message: "no user present" });
      } else {
        return job.create({
          location: location,
          jobName: position,
          graduation: qualification,
          description:desc,
          experience:experience,
          recruiter:user.name,
          userId: user.id,
        });
      }
    }).then((resp)=>{
        res.json({success:true,message:'job posted successfully'});
    })
  } catch (err) {
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};


exports.getJobs=async (req,res,next)=>{
    let userid=parseToken(req.header('token'));
    console.log(userid);
    try{
        await job.findAll({where:{userId:userid}})
        .then(jobs=>{
            let obj=[];
             for(var i=0;i<jobs.length;i++)
             {
                obj.push({id:generateToken(jobs[i].id),job:jobs[i].jobName,qualification:jobs[i].graduation,
                    location:jobs[i].location,description:jobs[i].description,experience:jobs[i].experience,
                    recruiter:generateToken(jobs[i].userId)});
             } 
             res.json(obj);
        })
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.getJob=async (req,res,next)=>
{
  let id=parseToken(req.params.Id);
  try{
    await job.findByPk(id).then(job=>{
        res.json({id:generateToken(job.id),job:job.jobName,qualification:job.graduation,
        location:job.location,description:job.description,experience:job.experience,
        recruiter:generateToken(job.userId)});
        
    })
  }
  catch(err)
  {
    res.json(err);
  }
};

exports.update=async (req,res,next)=>{
  let location=req.body.location;
  let jobName=req.body.position;
  let graduation=req.body.qualification;
  let description=req.body.desc;
  let experience=req.body.experience;
  let userId=parseToken(req.body.token);
  let Id=parseToken(req.body.Id)
  try{
    await user.findByPk(userId)
    .then(user=>{
      if(!user)
      {
        res.status(404).josn({success:false,message:'user not found'})
      }
      else{
         return job.findByPk(Id);
      }
    }).then(job=>{
        job.update({location:location,
        jobName:jobName,
        graduation:graduation,
        description:description,
        experience:experience,
        userId:user.id})
    }).then(resp=>{
      res.json({success:true,message:'job updated successfully'});
    })
  }
  catch(err)
  {
    res.json(err);
  }
};

exports.delete=async (req,res,next)=>{
  let id=parseToken(req.params.Id);
try{
  await job.findByPk(id).then(resp=>{
    resp.destroy();
    res.json({success:true,message:'job deleted successfully'});
  })
}
catch(err)
{
  res.json(err);
}
}

exports.allJobs=async (req,res,next)=>{
  let id=parseToken(req.header('token'));
 try{
  await user.findByPk(id)
  .then(user=>{
    if(!user)
    {
        res.status(404).json({success:false,message:'no user present'});
    }
    else
    {
      return applied.findAll({where:{userID:user.id}});
    }
  }).then(jobs=>{
    let jobId=[];
    for(var i=0;i<jobs.length;i++)
    {
        jobId.push(jobs[i].jobId);
    }

    return  job.findAll({where:{id:{[Op.notIn]:jobId}}})
  })  .then(jobs=>{
     let ob=[];
    for(var i=0;i<jobs.length;i++)
    {
        ob.push({id:generateToken(jobs[i].id),job:jobs[i].jobName,qualification:jobs[i].graduation,
          location:jobs[i].location,description:jobs[i].description,experience:jobs[i].experience,
          recruiter:jobs[i].recruiter}); 
    }  
    res.json(ob);
  }) 
 }
 catch(err)
 {
  res.json(err);
 }
}