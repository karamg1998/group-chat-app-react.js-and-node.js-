import "./editprofile.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Editrecprofile() {
  let [firm,setFirm]=useState('');
  let [designation,setDesignation]=useState('');

  
  let navigate=useNavigate();

  let user=JSON.parse(localStorage.getItem('user'));
  let token=user.token;

  function rev(e)
  {
    navigate('/rec/profile')
  }

  
  async function update(e)
  {
    e.preventDefault();
    let obj={firm,designation,token}
  try{
    axios.post('http://localhost:4000/recinfo/update',obj)
    .then(res=>{
      console.log(res.data)
      if(res.data.success===true)
      {
        popup('profile updated successfully');
        setTimeout(()=>{
          navigate('/rec/profile');
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

  React.useEffect(()=>{
    let info=JSON.parse(localStorage.getItem('info'));
    setFirm(info.firm);
    setDesignation(info.designation);
  },[])
  
  return (
    <div className="edit-profile">
        <Navbar></Navbar>
        <form className="edit-form">
          <label className="col">Firm:</label>
          <input value={firm} type="text" className="col" id="col" onChange={(e)=>{setFirm(e.target.value)}}/>
          <label className="gr">Designation:</label>
          <input value={designation} type="text" className="gr" id="gr" onChange={(e)=>{setDesignation(e.target.value)}}/><br/><br/>
          <button id="rev" onClick={rev}>Back</button>
          <button id="update" onClick={update}>Update</button>
        </form>
    </div>
  );
}

export default Editrecprofile;
