import "./login.css"
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

   async function log(e) {
        e.preventDefault();

        if(email==='')
        {
          popup('email is mandatory')
          return;
        }
        if(pass==='')
        {
          popup('please enter your password')
          return;
        }

        try{
          axios.get('http://localhost:4000/getuser',{headers:{email:email,pass:pass}})
          .then(user=>{
            localStorage.setItem('token',JSON.stringify(user.data));
            console.log(user.data);
            if(user.data.success===true)
            {
                navigate('/home/chats');
            }
          })
        }
        catch(err)
        {
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
        <div>
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
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <br />
                    <br />
                    <label className="password">Password:</label>
                    <input
                        value={pass}
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => { setPass(e.target.value) }}
                    />
                    <br />
                    <br />

                    <button id="login" onClick={log}>
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
        </div>
    );
}

export default Login;