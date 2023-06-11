import './success.css';
import Header from '../Components/Header/Header';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Success()
{
    let navigate=useNavigate();
    let id=useParams().id;
    const [pass,setPass]=useState('');

    async function reset(e)
    {
        e.preventDefault();
        if(pass==='')
        {
          popup('please enter password');
          return;
        }
        else{
            try{
                await axios.get('http://localhost:4000/forgot/success',{headers:{'forgot':id,'pass':pass}})
                .then(r=>{
                    console.log(r.data);
                        popup(r.data.m);
                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                    
                   
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
    };

    return(
        <div className="signup">
            <Header></Header>
            <br />
            <br />
            <form className="form">
                <label className="email">Enter new password:</label>
                <input
                    value={pass}
                    type="password"
                    id="email"
                    name="email"
                    onChange={(e) => { setPass(e.target.value) }}
                />
                <br />
                <br />
                <button id='f' onClick={reset}>Reset</button>
            </form>
        </div>
    )
}

export default Success;