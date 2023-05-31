const express=require('express');
const sequelize=require('./database/db');
const cors=require('cors');
const app=express();
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');

const User=require('./models/user');
const forgot=require('./models/forgotPass');
const messages=require('./models/messages');

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(chatRoutes);


User.hasMany(forgot);
User.hasMany(messages);


sequelize.sync().then(res=>{
    app.listen(4000);
}).catch(err=>console.log(err));