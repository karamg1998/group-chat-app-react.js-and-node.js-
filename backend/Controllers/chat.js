let message=require('../models/messages');
let room=require('../models/room');
let groupMessages=require('../models/group-messages');
let user=require('../models/user');
let jwt=require('jsonwebtoken');

function parseToken(id) {
    let j = jwt.verify(id, 'hffgjhfgjhfgj');
    return j.Id;
}

exports.returnChats = async (req, res, next) => {
    let logger = parseToken(req.header('logger'));
    let secondaryUser = parseToken(req.header('secondary'));
   
    try {
       await message.findAll({ where: {userId:[secondaryUser,logger,['id','ASC']],to:[secondaryUser,logger]}})
          .then(response => {
            let obj=[];
            for(var i=0;i<response.length;i++)
            {
             if(response[i].userId===logger)
             {
                obj.push({message:response[i].message,sender:'logger'});
             }
             else{
                obj.push({message:response[i].message,sender:'secondary'});
             }
            }
            res.json(obj);
          })
    }
    catch (err) {
       res.json(err);
    }
 };

 exports.addM=async (req,res,next)=>{
  let id=parseToken(req.body.pId);
  let group=parseToken(req.body.id);
  try{
   await user.findOne({where:{id:id}}).then(user=>{
       return groupMessages.create({
           message:req.body.msg,
           userId:id,
           groupId:group,
           userName:user.name
       });
   })
   .then(m=>{
       res.json({m:'message sent'});
   })
  }
  catch(err)
  {
   res.json(err);
  }
};

exports.getM=async (req,res,next)=>{
   let id=parseToken(req.header('token'));
   let group=parseToken(req.header('group'));
   try{
       await groupMessages.findAll({where:{groupId:[group,['id','ASC']]}})
       .then(m=>{
           let obj=[];
           for(var i=0;i<m.length;i++)
           {
             if(m[i].userId===id)
             {
               obj.push({message:m[i].message,sender:'logger',name:m[i].userName});
             }
             else{
               obj.push({message:m[i].message,sender:'secondary',name:m[i].userName});
             }
           }
           res.json(obj);
       })
   }
   catch(err)
   {
       res.json(err);
   }
};

exports.getRoom=async (req,res,next)=>{
   let token=parseToken(req.header('token'));
   let id=parseToken(req.header('id'));
  try{
   let private=await room.findOne({where:{userId1:[token,id],userId:[token,id]}});
      if(!private)
      {
         room.create({
            userId1:id,
            userId:token
         }).then(room=>{
            res.json({room:room.id});
         })
      }
      else{
         res.json({room:private.id});
      }
  }
  catch(err)
  {
   res.status(500).json({err:err});
  }
};