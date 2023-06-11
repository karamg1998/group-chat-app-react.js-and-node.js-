const User = require('../models/user');
const bcrypt = require('bcrypt');
const forgot=require('../models/forgotPass');
const jwt = require('jsonwebtoken');

function generateToken(id)
{
    return jwt.sign({Id:id},'hffgjhfgjhfgj');
}

function parseToken(id) {
    let j = jwt.verify(id, 'hffgjhfgjhfgj');
    return j.Id;
}


exports.addUser = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.pass, 10,async (err, hash) => {
            try{
                await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
            }).then(user=>{
                res.json({success:true,message:'user signed up successfully',user:user});
                console.log('user signed up successfully');
            })
            }
            catch(err)
            {
                console.log('bcrypt',err);
            }
            
        })
    }
    catch(err)
    {
        res.json(err);

    }
};

exports.getUser=async (req,res,next)=>{
    let email=req.header('email');
    let pass=req.header('pass');
 try{
   await User.findOne({where:{email:email}})
   .then(user=>{
    if(!user)
    {
        res.json({success:false,message:'no user present'})
    }
    else{
        bcrypt.compare(pass,user.password,(err,response)=>{
            if(response===false)
            {
              res.status(401).json({success:false,message:'wrong password'});
              console.log('not matched');
              
            }
            if(response===true)
            {
              res.status(200).json({success:true,message:'password matched',token:generateToken(user.id),name:user.name,recruiter:user.recruiter});
              console.log('matched');
            }
            if(err)
            {
              console.log(err);
              res.status(500).json(err);
            }
        })
    }
   })
 }
 catch(err)
 {
    res.json(err);
 }
};

exports.getUsers=async (req,res,next)=>{
    let id=parseToken(req.header('token'));
    try{
        await User.findOne({where:{id:id}})
        .then((user)=>{
             if(!user)
             {
                res.json({success:false,message:'something went wrong'});
             }
             else{
                return User.findAll();
             }
        }).then(users=>{
            let obj=[];
            for(var i=0;i<users.length;i++)
            {
                if(users[i].id==id)
                {
                    continue;
                }
                else{
                    obj.push({name:users[i].name,id:generateToken(users[i].id)});
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

exports.user=async (req,res,next)=>{
    let id=parseToken(req.header('token'));
    try{
        await User.findOne({where:{id:id}})
        .then(user=>{
            res.json({name:user.name})
        })
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.profile=async (req,res,next)=>{
    let id=parseToken(req.header('token'));
    try{
        await User.findOne({where:{id:id}})
        .then(user=>{
           
            res.json({name:user.name,email:user.email,phone:user.phone})
        })
    }
    catch(err)
    {
        res.json(err);
    }
}

exports.forgot=async (req,res,next)=>{
    let phone=req.header('phone');
    let email=req.header('email');
    try{
        let u=await User.findOne({where:{phone:phone,email:email}});
        if(!u)
        {
            res.json({success:false,m:'no user found'});
        }
        else{
            let f=await forgot.create({
                active:'true',
                userId:u.id
            });
            res.json({success:true,forgot:generateToken(f.id)});
        }
    }
    catch(err)
    {
        res.json(err);
    }
};

exports.success=async (req,res,next)=>{
    let pass=req.header('pass');
    let id=parseToken(req.header('forgot'));
    try{
        let f=await forgot.findOne({where:{id:id}});
        if(!f || f.active==='false')
        {
            res.json({success:false,m:'unauthorized request'});
        }
        else
        {
            let user= await User.findOne({where:{id:f.userId}});
             if(user)
             {
                bcrypt.hash(pass,10,async(err,hash)=>{
                    try{
                        user.update({
                            password:hash
                        })
                        .then(u=>{
                            f.update({active:'false'});
                            res.json({success:true,m:'password updated successfully'});
                        })
                    }
                    catch(err)
                    {
                        res.json(err);
                    }
                })
             }
        }
    }
    catch(err)
    {
        res.json(err);
    }

}