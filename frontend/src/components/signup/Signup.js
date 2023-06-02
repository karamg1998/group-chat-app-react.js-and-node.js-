import "./signup.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/* const dotenv=require('dotenv');
dotenv.config(); */


function Signup() {
    let navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  let rec;

 async function sign(e) {
    e.preventDefault();
    if(e.target.id==='signup')
    {
      rec='false';
      if(name==='')
      {
        popup('name is mandatory')
        return;
      }
      if(email==='')
      {
        popup('email is mandatory')
        return;
      }
      if(phone==='')
      {
        popup('phone is mandatory')
        return;
      }
      if(pass==='')
      {
        popup('password is mandatory')
        return;
      }
      let obj={name,email,phone,pass,rec}
      try{
       axios.post('http://localhost:4000/adduser',obj)
       .then((res)=>{
           if(res.data.success===true)
           {
               popup('signup successfully')
               setTimeout(() => {
                   navigate('/')
               }, 1000);
           }
       })
      }
      catch(err)
      {
       console.log(err);
      }
    }
    if(e.target.id==='recruiter')
    {
      rec='true';
      if(name==='')
      {
        popup('name is mandatory')
        return;
      }
      if(email==='')
      {
        popup('email is mandatory')
        return;
      }
      if(phone==='')
      {
        popup('phone is mandatory')
        return;
      }
      if(pass==='')
      {
        popup('password is mandatory')
        return;
      }
      let obj={name,email,phone,pass,rec}
      try{
       axios.post("http://localhost:4000/adduser",obj)
       .then((res)=>{
           if(res.data.success===true)
           {
               popup('signup successfully')
               setTimeout(() => {
                   navigate('/')
               }, 1000);
           }
       })
      }
      catch(err)
      {
       console.log(err);
      }
    }
  }

  function popup(data) {
    let element = document.querySelector(".popup");
    let n_element = document.createElement("div");
    n_element.className = "toast";
    n_element.innerText = data;
    element.appendChild(n_element);
    setTimeout(() => {
      n_element.remove();
    }, 2000);
  }
  
  return (
    <div className="signup">
      <Header></Header>
      <br />
      <br />
      <form className="form">
        <label className="name">Name:</label>
        <input
          value={name}
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <label className="email">Email:</label>
        <input
          value={email}
          type="email"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <label className="phone">Phone:</label>
        <input
          value={phone}
          type="number"
          id="phone"
          name="phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <br />
        <br />
        <label className="password">Password:</label>
        <input
          value={pass}
          type="password"
          id="password"
          name="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <br />
        <br />
        <button id="signup" onClick={sign}>
          Sign Up
        </button>
        <button id="recruiter" onClick={sign}>Signup as Recruiter</button><br/><br/>
        <Link to="/">
          <button id="login">Already a user</button>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
