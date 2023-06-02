import "./editprofile.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Editprofile() {
  let [college,setCollege]=useState('');
  let [graduation,setGraduation]=useState('');
  let [spec,setSpec]=useState('');
  let [sk1,setSk1]=useState('');
  let [sk2,setSk2]=useState('');
  let [sk3,setSk3]=useState('');
  let [sk4,setSk4]=useState('');
  let [sk5,setSk5]=useState('');
  
  let navigate=useNavigate();

  let user=JSON.parse(localStorage.getItem('user'));
  let token=user.token;

  function rev(e)
  {
    navigate('/home/profile')
  }

  
  async function update(e)
  {
    e.preventDefault();
    let obj={college,graduation,spec,sk1,sk2,sk3,sk4,sk5,token}
  try{
    axios.post('http://localhost:4000/updateinfo',obj)
    .then(res=>{
      if(res.data.success===true)
      {
        popup('profile updated successfully')
        setTimeout(()=>{
          navigate('/home/profile');
        },1000)
      }
    })
  }
  catch(err)
  {
    console.log(err);
  }
  }

  React.useEffect(()=>{
    let info=JSON.parse(localStorage.getItem('info'));
    setCollege(info.college);
    setGraduation(info.graduation);
    setSpec(info.specialization);
    setSk1(info.skill1);
    setSk2(info.skill2);
    setSk3(info.skill3);
    setSk4(info.skill4);
    setSk5(info.skill5);
  },[])
  
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
    <div className="edit-profile">
        <Navbar></Navbar>
        <form className="edit-form">
          <label className="col">College:</label>
          <input value={college} type="text" className="col" id="col" onChange={(e)=>{setCollege(e.target.value)}}/>
          <label className="gr">Graduation:</label>
          <input value={graduation} type="text" className="gr" id="gr" onChange={(e)=>{setGraduation(e.target.value)}}/><br/><br/>
          <label className="sp">Specialization:</label>
          <input value={spec} type="text" className="sp" id="sp" onChange={(e)=>{setSpec(e.target.value)}}/><br/><br/>
          <label className="sk">Skills(max 5):</label>
          <input value={sk1} type="text" className="sk1" id="sk1" onChange={(e)=>{setSk1(e.target.value)}}/>
          <input value={sk2} type="text" className="sk2" id="sk2" onChange={(e)=>{setSk2(e.target.value)}}/><br/><br/>
          <input value={sk3} type="text" className="sk3" id="sk3" onChange={(e)=>{setSk3(e.target.value)}}/>
          <input value={sk4} type="text" className="sk4" id="sk4" onChange={(e)=>{setSk4(e.target.value)}}/>
          <input value={sk5} type="text" className="sk5" id="sk5" onChange={(e)=>{setSk5(e.target.value)}}/><br/><br/>
          <button id="rev" onClick={rev}>Back</button>
          <button id="update" onClick={update}>Update</button>
        </form>
    </div>
  );
}

export default Editprofile;
