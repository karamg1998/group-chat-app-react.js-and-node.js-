import { useNavigate, useParams } from "react-router-dom";
import "./gchat.css"
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import io from "socket.io-client"
const socket=io.connect("http://localhost:4000");

function Gchat() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [group,setGroup]=useState('');
  let id = useParams().id;
  let user = JSON.parse(localStorage.getItem('token'));
  let pId = user.token;
  let  Name=user.name;
  let chatSec=document.querySelector('.chat-sec');

  useEffect(() => {
    Interval();
  }, []);

  let Interval = async () => {
    try {
      await axios.get('http://localhost:4000/group/getm', { headers: { 'token': pId, 'group': id } })
        .then(user => {
          let group = localStorage.getItem('group');
          setName(group);
          setGroup(user.data.room);
          socket.emit("join_room",user.data.room);
          setData(user.data.obj);
        })
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    let c=document.querySelector('.chat-sec');
     socket.on("receive_groupMessage",(data)=>{
      c.innerHTML+=`<div>
      <ul class="sec">${data.msg}</ul><br>
      <ul class="other">${data.Name}</ul>
      <br>
      <br>
    </div>`;
     });
  },[socket])

  function back(e) {
    e.preventDefault();
    navigate('/home/groups')
  }

  function allm(e) {
    e.preventDefault();
    navigate(`/home/groups/members/${id}`);
  }

  async function snd(e) {
    e.preventDefault();
    let obj = { id, pId, msg ,group,Name}
    if (msg === '') {
      alert('enter message');
      return;
    }
    else {
      socket.emit("send_groupMessage",obj);
      chatSec.innerHTML+=`<div>
      <ul class="log">${msg}</ul><br>
      <ul class="you">you</ul>
      <br>
      <br>
    </div>`
    }
  }

  return (
    <div>
      <div className="c-header">
        <button id="b" onClick={back}>↩</button>
        <header className="h">
          {name}
        </header>
        <button id="allm" onClick={allm}>All members</button>
      </div>
      <br>
      </br>
      <section className="chat-sec">
        {
          data.map((i, j) => {
            if (i.sender === 'logger') {
              return (
                <div>
                  <ul className="log">{i.message}</ul><br></br>
                  <ul className="you">you</ul>
                  <br></br>
                  <br></br>
                </div>
              )
            }
            else {
              return (
                <div>
                  <ul className="sec">{i.message}</ul><br></br>
                  <ul className="other">{i.name}</ul>
                  <br></br>
                  <br></br>
                </div>

              )
            }
          })
        }
      </section><br></br><br></br>
      <section className="c-form">
        <input value={msg} type="text" id="c-msg" name="c-msg" onChange={(e) => { setMsg(e.target.value) }}></input>
        <button id="c-snd-mssg" onClick={snd}>Send</button>
      </section>

    </div>
  )
}

export default Gchat;

