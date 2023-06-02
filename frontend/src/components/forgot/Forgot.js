import './forgot.css'
import Header from '../header/Header'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgot()
{
    let navigate=useNavigate();

    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');

    async function submit(e)
    {
         e.preventDefault();
         let obj={email,phone}
        try{
          axios.post('http://localhost:4000/forgotpass',obj)
          .then((res)=>{
            console.log(res.data);
            if(res.data.success===true)
            {
                let u=JSON.stringify(res.data);
                localStorage.setItem('forgot',u);
                popup('success');
                setTimeout(()=>{
                   navigate('/forgot/'+res.data.userToken)
                },1000)
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

      function back(e)
      {
        navigate('/');
      }
      

    return(
        <div className='forgot-con'>
            <Header></Header>
            <form className='forgot-form'>
                <label className='email'>Email:</label>
                <input value={email} type='email' id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/><br></br><br></br>
                <label className='phone'>Phone:</label>
                <input value={phone} type='number' id="phone" name="phone" onChange={(e)=>{setPhone(e.target.value)}}/><br></br><br></br>
                <button id='back' onClick={back}>Back</button>
                <button id='forgot' onClick={submit}>Send</button>
            </form>
        </div>
    )
}

export default Forgot;