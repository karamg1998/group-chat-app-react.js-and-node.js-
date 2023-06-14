import { useNavigate, useParams } from "react-router-dom";
import "./chat.css"
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function Chat() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [room, setRoom] = useState('');
  let id = useParams().id;
  let user = JSON.parse(localStorage.getItem('token'));
  let pId = user.token;
  let n = document.querySelector('.chat-sec');

  useEffect(() => {
    interval();
  }, []);

  let interval = async () => {
    try {
      await axios.get('http://localhost:4000/getmessages', { headers: { 'logger': pId, 'secondary': id } })
        .then(user => {
          console.log(user.data);
          setData(user.data.obj);
          let chat = localStorage.getItem('chat');
          setName(chat);
          setRoom(user.data.room);
          socket.emit("join_room", user.data.room);
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let n1 = document.querySelector('.chat-sec');
    socket.on("receive_message", (data) => {
      n1.innerHTML += ` <div class="secondary">
      <ul class="sec">${data.msg}</ul>
      <br>
      <br>
      </div>`
    });
  }, [socket]);


  function back(e) {
    e.preventDefault();
    navigate('/home/chats')
  }

  async function snd(e) {
    e.preventDefault();
    let obj = { id, pId, msg, room }
    if (msg === '') {
      alert('enter message');
      return;
    }
    else {
      n.innerHTML += ` <div class="logger">
        <ul class="log">${msg}</ul>
        <br>
        <br>
        </div>`

      socket.emit("send_message", obj);
      setMsg('');
    }
  }

  return (
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
          data.map((i, j) => {
            if (i.sender === 'logger') {
              return (
                <div className="logger">
                  <ul className="log">{i.message}</ul>
                  <br></br>
                  <br></br>
                </div>
              )
            }
            else {
              return (
                <div className="secondary">
                  <ul className="sec">{i.message}</ul>
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

export default Chat;
