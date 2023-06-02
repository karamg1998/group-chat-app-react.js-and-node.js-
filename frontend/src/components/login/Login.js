import "./login.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
/* const dotenv=require('dotenv');
dotenv.config(); */

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function login(e) {
    e.preventDefault();
    try {
      axios
        .get('http://localhost:4000/getuser', {
          headers: { email: email, pass: pass },
        })
        .then((res) => {
          if (res.data.success === true) {
            if(res.data.recruiter==='false')
            {
            let u = JSON.stringify(res.data);
            localStorage.setItem("user", u);
            popup(res.data.message);
            setTimeout(()=>{
              navigate("/home/alljobs");
            },1000)
            }
            else{
            let u = JSON.stringify(res.data);
            localStorage.setItem("user", u);
            popup(res.data.message);
            setTimeout(()=>{
              navigate("/rec/postjob");
            },1000)
            }
             
          } else {
            popup(res.data.message);
          }
        });
    } catch (err) {
      console.log(err);
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
    <div className="login">
      <Header></Header>
      <br />
      <br />
      <form className="form">
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

        <button id="login" onClick={login}>
          Login
        </button>

        <Link to="/signup">
          <button id="signup">New User</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/forgot">
          <button id="forg">Forgot password</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
