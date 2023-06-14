const express=require('express');
const sequelize=require('./database/db');
const cors=require('cors');
const http=require('http');
const { Server } = require("socket.io");
const app=express();
const server = http.createServer(app);
const jwt=require('jsonwebtoken');

function parseToken(id) {
  let j = jwt.verify(id, 'hffgjhfgjhfgj');
  return j.Id;
}

app.use(cors());
app.use(express.json());

const io=new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const groupRoutes=require('./routes/groupRoutes');

const User=require('./models/user');
const forgot=require('./models/forgotPass');
const messages=require('./models/messages');
const group=require('./models/group');
const groupMessages=require('./models/group-messages');
const groupMembers=require('./models/group-member');
const groupRoom=require('./models/groupRoom');
const room=require('./models/room');

app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);

User.hasMany(forgot);
User.hasMany(messages);
User.hasMany(group);
User.hasMany(groupMessages);
User.hasMany(groupMembers);
User.hasOne(room);
group.hasMany(groupMembers);
group.hasMany(groupMessages);
group.hasOne(groupRoom);


  io.on("connection", (socket) => {
  
    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("send_groupMessage",async(data)=>{
      let {Name,msg}=data;
        let id=parseToken(data.pId);
        let group=parseToken(data.id);
        try{
         await User.findOne({where:{id:id}}).then(user=>{
             return groupMessages.create({
                 message:data.msg,
                 userId:id,
                 groupId:group,
                 userName:user.name
             });
         })
         .then(m=>{
          socket.to(data.room).emit("receive_groupMessage",{Name,msg});
         })
        }
        catch(err)
        {
          socket.to(data.room).emit("receive_groupMessage",err)
        }
    })
  
    socket.on("send_message",async (data) => {
      let {msg}=data;
        let logger = parseToken(data.pId);
        let sUser = parseToken(data.id);
       try{
            await messages.create({
              message: data.msg,
              to: sUser,
              userId: logger
           }).then(message => {
            socket.to(data.room).emit("receive_message", {msg});
           })
          }
           catch(err)
           {
            socket.to(data.room).emit("receive_message", err);
           }
    });
  });


    sequelize.sync().then(res=>{
      server.listen(4000);
  }).catch(err=>console.log(err));