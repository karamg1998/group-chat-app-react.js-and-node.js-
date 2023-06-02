import './pass.css'
import Header from '../header/Header'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Pass()
{
    let navigate=useNavigate();
    const [password,setPass]=useState('');
   
    let user=JSON.parse(localStorage.getItem('forgot'));
    let fToken=user.forgot;
    let userToken=user.userToken;

    async function set(e)
    {
         e.preventDefault();     
         let obj={password,fToken,userToken};
        try{
          axios.post('http://localhost:4000/forgotpasssuccess',obj)
          .then((res)=>{
            console.log(res.data);
            if(res.data.success===true)
            {
                localStorage.removeItem('forgot');
                popup('password change and being redirected to login page');
                setTimeout(()=>{
                   navigate('/')
                },1000)
            }
            else{
                popup(res.data.message)
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
      

    return(
        <div className='forgot-con'>
            <Header></Header>
            <form className='forgot-form'>
                <label className='setpass'>Set password:</label>
                <input value={password} type='password' id="setpass" name="pass" onChange={(e)=>{setPass(e.target.value)}}/><br></br><br></br>
                <button id='forgot' onClick={set}>Submit</button>
            </form>
        </div>
    )
}

export default Pass;