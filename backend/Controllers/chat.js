let message=require('../models/messages');
let room=require('../models/room');
let groupRoom=require('../models/groupRoom');
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
    let roomId;
   
    try {
      let private=await room.findOne({where:{userId1:[logger,secondaryUser],userId:[logger,secondaryUser]}});
      if(!private)
      {
         room.create({
            userId1:secondaryUser,
            userId:logger
         }).then(room=>{
             roomId=room.id;
         })
      }
      else{
         roomId=private.id;
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
           res.json({obj:obj,room:roomId});
         })
      }
  }
  catch(err)
  {
   res.status(500).json({err:err});
  }
 };


exports.getM=async (req,res,next)=>{
   let id=parseToken(req.header('token'));
   let group=parseToken(req.header('group'));
   let roomId;
   try{
       await groupRoom.findOne({where:{groupId:group}})
       .then(g=>{
         roomId=g.id;
         return groupMessages.findAll({where:{groupId:[group,['id','ASC']]}});
       }).then(m=>{
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
           res.json({obj:obj,room:roomId});
       })
   }
   catch(err)
   {
       res.json(err);
   }
};

