import { useNavigate, useParams } from "react-router-dom";
import "./chat.css"
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
function Chat()
{
  let navigate=useNavigate();
  const [data,setData]=useState([]);
  const [name,setName]=useState('');
  const [msg,setMsg]=useState('');
  let id=useParams().id;
  let user=JSON.parse(localStorage.getItem('token'));
  let pId=user.token;

  
  React.useEffect(()=>{
    u();
 },[]);

  async function u()
  {
    try{
      await axios.get('http://localhost:4000/user',{headers:{'Token':id}})
      .then(user=>{
        setName(user.data.name);
      })
     }
     catch(err)
     {
      console.log(err)
     }
  }

useEffect(()=>{

  let interval=setInterval(async () => {
     try{
      await axios.get('http://localhost:4000/getmessages',{headers:{'logger':pId,'secondary':id}})
      .then(user=>{
        console.log(user.data);
        setData(user.data);
      })
     }
     catch(err)
     {
      console.log(err)
     }
  }, 1000);
   
  return () => clearInterval(interval);
})


  function back(e)
  {
    e.preventDefault();
    navigate('/home/chats')
  }
  
 async function snd(e)
  {
    e.preventDefault();
    let obj={id,pId,msg}
    try{
      await axios.post('http://localhost:4000/addchat',obj)
      .then(res=>{
        console.log(res);
      })
    }
    catch(err)
    {
      console.log(err);
    }
  }


   return(
    <div>
      <div className="c-header">
        <button id="b" onClick={back}>↩</button>
        <header className="h">
          {name}
        </header>
      </div>
        <br>
        </br>
        <section className="chat-sec">
        {
          data.map((i,j)=>{
           if(i.sender==='logger')
           {
            return(
              <div>
                <ul className="log">{i.message}</ul>
                <br></br>
                <br></br>
              </div>
              
            )
           }
           else{
            return(
              <div>
                 <ul className="sec">{i.message}</ul>
                 <br></br>
                <br></br>
              </div>
             
            )
           }
          })
        }
        </section>
        <section className="c-form">
            <input value={msg} type="text" id="c-msg" name="c-msg" onChange={(e)=>{setMsg(e.target.value)}}></input>
            <button id="c-snd-mssg" onClick={snd}>Send</button>
        </section>

    </div>
   )
}

export default Chat;
