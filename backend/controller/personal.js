const info=require('../models/personalinfo');
const jwt=require('jsonwebtoken');

function parseToken(id)
{
  let parseId=jwt.verify(id,'hffgjhfgjhfgj');
  return parseId.Id;

}

exports.personalInfo=async(req,res,next)=>{
     let id=parseToken(req.header('token'));
     try{
        await info.findOne({where:{userId:id}})
        .then(info=>{
            res.json({name:info.name,email:info.email,phone:info.phone,college:info.College,
                graduation:info.Graduation,specialization:info.specialization,
                skill1:info.Skill1,
                skill2:info.Skill2,
                skill3:info.Skill3,
                skill4:info.Skill4,
                skill5:info.Skill5,})
        })
     }
     catch(err)
     {
        res.json(err);
     }
};

exports.updateInfo=async(req,res,next)=>{
    let college=req.body.college;
    let graduation=req.body.graduation;
    let spec=req.body.spec;
    let sk1=req.body.sk1;
    let sk2=req.body.sk2;
    let sk3=req.body.sk3;
    let sk4=req.body.sk4;
    let sk5=req.body.sk5;
    let userid=parseToken(req.body.token);
    
    try{
      await info.findOne({where:{userId:userid}})
      .then(user=>{
        return user.update({College:college,Graduation:graduation,specialization:spec,
          Skill1:sk1,Skill2:sk2,Skill3:sk3,Skill4:sk4,Skill5:sk5})
      }).then(info=>{
         res.json({success:true,message:'updated'})
      })
    }
    catch(err)
    {
      res.json(err);
    }
};