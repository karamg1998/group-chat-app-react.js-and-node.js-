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

app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);

User.hasMany(forgot);
User.hasMany(messages);
User.hasMany(group);
User.hasMany(groupMessages);
User.hasMany(groupMembers);
group.hasMany(groupMembers);
group.hasMany(groupMessages);


  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
    });
  
    socket.on("send_message",async (data) => {
        let logger = parseToken(data.pId);
        let sUser = parseToken(data.id);
       try{
            await messages.create({
              message: data.msg,
              to: sUser,
              userId: logger
           }).then(message => {
            socket.to(data.room).emit("receive_message", data.msg);
           })
          }
           catch(err)
           {
            console.log(err);
           }
    });
  });


    sequelize.sync().then(res=>{
      server.listen(4000);
  }).catch(err=>console.log(err));