import { useNavigate, useParams } from "react-router-dom";
import "./gchat.css"
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function Gchat() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  let id = useParams().id;
  let user = JSON.parse(localStorage.getItem('token'));
  let pId = user.token;

  React.useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {

    let interval = setInterval(async () => {
      try {
        await axios.get('http://localhost:4000/group/getm', { headers: { 'token': pId, 'group': id } })
          .then(user => {
            console.log(user.data);
            setData(user.data);
          })
      }
      catch (err) {
        console.log(err)
      }
    }, 1000);

    return () => clearInterval(interval);
  })

  function fetch() {
    let group = localStorage.getItem('group');
    setName(group);
  }


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
    let obj = { id, pId, msg }
    if (msg === '') {
      alert('enter message');
      return;
    }
    else {
      try {
        await axios.post('http://localhost:4000/group/addm', obj)
          .then(res => {
            console.log(res);
            setMsg('');
          })
      }
      catch (err) {
        console.log(err);
      }
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

