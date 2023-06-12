let Group=require('../models/group');
let groupMember=require('../models/group-member');
let room=require('../models/groupRoom');
let User=require('../models/user');
let jwt=require('jsonwebtoken');

function parseToken(id) {
    let j = jwt.verify(id, 'hffgjhfgjhfgj');
    return j.Id;
}

function generateToken(id)
{
    return jwt.sign({Id:id},'hffgjhfgjhfgj');
}

exports.CreateGroup=async (req,res,next)=>{
    let id=parseToken(req.body.token);
    let gName=req.body.grpname;
    let gid;
 try{
    await Group.create({
        name:gName,
        userId:id
    }).then(gr=>{
        gid=gr.id;
        return User.findOne({where:{id:id}});
    }).then(u=>{
        return groupMember.create({
            admin:'true',
            groupName:gName,
            userName:u.name,
            userId:id,
            groupId:gid
        });
    }).then(re=>{
        return room.create({
            id:Math.random(),
            groupId:gid,
            groupName:gName
        });
    }).then(g=>{
        res.json({success:true,message:'group created'});
    })
 }   
 catch(err)
 {
    res.json(err);
 }
};

exports.getGroup=async (req,res,next)=>{
    let id=parseToken(req.header('token'));
    try{
        await groupMember.findAll({where:{userId:id}})
        .then(g=>{
            let obj=[];
            for(let i=0;i<g.length;i++)
            {
                obj.push({groupName:g[i].groupName,groupId:generateToken(g[i].groupId)})
            }
            res.json(obj);
        });
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.getM=async (req,res,next)=>{
    let id=parseToken(req.header('group'));
    try{
        await groupMember.findAll({where:{groupId:id}})
        .then(group=>{
           let obj=[];
           for(var i=0;i<group.length;i++)
           {
             obj.push({name:group[i].userName,gId:generateToken(group[i].groupId),uId:generateToken(group[i].userId),admin:group[i].admin});
           }
           res.json(obj);
        })
    }
    catch(err)
    {
        res.json(err);
    }
}

exports.addM=async (req,res,next)=>{
   let groupId=parseToken(req.body.id);
   let phone=req.body.phone;
   let gName=req.body.group;

   try{
    let u=await User.findOne({where:{phone:phone}});
    if(!u)
    {
        res.json({m:'no user found'});
    }
    else{
        let g=await groupMember.findOne({where:{userId:u.id,groupId:groupId}});
        if(g)
        {
            res.json({m:'user already present'});
        }
        else{
            let gm=await groupMember.create({
                userName:u.name,
                groupName:gName,
                admin:'false',
                userId:u.id,
                groupId:groupId
            });
            res.json({success:true,m:'user added'});
        }
    }
   }
   catch(err)
   {
    res.json(err);
   }
}

exports.isAdmin=async (req,res,next)=>{
    let groupId=parseToken(req.header('group')); 
    let user=parseToken(req.header('user'));

    try{
        await groupMember.findOne({where:{userId:user,groupId:groupId}})
        .then(g=>
            {
                if(g.admin==='true')
                {
                    res.json({admin:true});
                }
                else{
                    res.json({admin:false});
                }
            })
    }
    catch(err)
    {
        res.json(err);
    }
 
}

exports.makeAdmin=async (req,res,next)=>{
    let userId=parseToken(req.header('userId'));
    let groupId=parseToken(req.header('groupId'));
    console.log(userId,groupId)
    try{
        await groupMember.findOne({where:{userId:userId,groupId:groupId}})
        .then(gm=>{
            return gm.update({admin:'true'});
        }).then(g=>{
            res.json({success:true,m:'user is now admin'})
        })
    }
    catch(err)
    {
        res.json(err);
    }
}

exports.rem=async (req,res,next)=>
{ 
    let userId=parseToken(req.header('user'));
    let groupId=parseToken(req.header('group'));
    try{
        await groupMember.findOne({where:{userId:userId,groupId:groupId}})
        .then(g=>{
            g.destroy();
            res.json({success:true,m:'user removed'})
        });
    }
    catch(err)
    {
        res.json(err);
    }
   
};

exports.delG=async(req,res,next)=>{
    let groupId=parseToken(req.header('group'));
try{
    await groupMember.findAll({where:{groupId:groupId}})
    .then(r=>{
        for(let i=0;i<r.length;i++)
           {
            r[i].destroy();
           }
           return Group.findOne({where:{id:groupId}});
    }).then(g=>{
        g.destroy();
        res.json({success:true,m:'group deleted'});
    })
}
    catch(err)
    {
        res.json(err);
    }
};

exports.leave=async (req,res,next)=>{
    let userId=parseToken(req.header('user'));
    let groupId=parseToken(req.header('group'));
    try{
      await groupMember.findOne({where:{groupId:groupId,userId:userId}})
      .then(g=>
        {
            g.destroy();
            res.json({success:true,m:'group leaved'})
        })
    }
    catch(err)
    {
        res.json(err);
    }
};