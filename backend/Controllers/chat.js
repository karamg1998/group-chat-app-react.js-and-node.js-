let message=require('../models/messages');
let Room=require('../models/privateRoom');
let jwt=require('jsonwebtoken');

function parseToken(id) {
    let j = jwt.verify(id, 'hffgjhfgjhfgj');
    return j.Id;
}

function generateToken(id)
{
    return jwt.sign({Id:id},'hffgjhfgjhfgj');
}

exports.addChat = async (req, res, next) => {
   console.log(req.body)
   let logger = parseToken(req.body.pId);
   let sUser = parseToken(req.body.id);
   try {
      await message.create({
         message: req.body.msg,
         to: sUser,
         userId: logger
      }).then(message => {
         res.json({success:true,message:'added'});
      })
   }
   catch (err) {
      res.json(err);
   }
};

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