import './create.css';
import Navigation from '../Navigation/Navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateGroup() {
    let navigate=useNavigate();
    const [grpname,setGrpname]=useState('');
    let user=JSON.parse(localStorage.getItem('token'));
    let token=user.token;

   async function create(e)
   {
    e.preventDefault();
    let obj={token,grpname};
    if(grpname==='')
    {
        popup('group name cannot empty');
        return;
    }
    else{
         try{
        await axios.post('http://localhost:4000/createGroup',obj)
        .then(res=>{
            console.log(res.data);
            if(res.data.success===true)
            {
                navigate('/home/groups');
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
        <div>
            <Navigation></Navigation>
            <br></br>
            <div className='g'>
                <label className='en'>Enter group name:</label>
                <input value={grpname} type='text' placeholder='enter group name..' name='group-name' className='group-n' onChange={(e) => { setGrpname(e.target.value) }}></input><br></br><br></br>
                <button id='crg' onClick={create}>Create Group</button>
            </div>
        </div>
    )
}

export default CreateGroup;