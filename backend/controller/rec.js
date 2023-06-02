const rec=require('../models/recruiter');
const jwt=require('jsonwebtoken');

function parseToken(id)
{
  let parseId=jwt.verify(id,'hffgjhfgjhfgj');
  return parseId.Id;

}

exports.info=async(req,res,next)=>{
     let id=parseToken(req.header('token'));
     try{
        await rec.findOne({where:{userId:id}})
        .then(info=>{
            res.json({name:info.name,email:info.email,phone:info.phone,firm:info.Firm,designation:info.Designation});
        })
     }
     catch(err)
     {
        res.json(err);
     }
};

exports.update=async(req,res,next)=>{
    let firm=req.body.firm;
    let designation=req.body.designation;
    let userid=parseToken(req.body.token);
    console.log(userid)
    try{
      await rec.findOne({where:{userId:userid}})
      .then(user=>{
        return user.update({Firm:firm,Designation:designation})
      }).then(info=>{
         res.json({success:true,message:'updated',i:info})
      })
    }
    catch(err)
    {
      res.json(err);
    }
};