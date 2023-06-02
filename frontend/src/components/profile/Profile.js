import "./profile.css";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import React, {  useState } from "react";
import axios from "axios";

function Profile() {
 
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  let [college,setCollege]=useState('');
  let [graduation,setGraduation]=useState('');
  let [spec,setSpec]=useState('');
  let [skills,setSkills]=useState('');

 React.useEffect(()=>{
    fetch();
  });

  let user=JSON.parse(localStorage.getItem('user'));
  async function fetch()
  {
    try{
      await  axios.get("http://localhost:4000/info",{headers:{'token':user.token}})
        .then(res=>{
          console.log(res.data)
         localStorage.setItem('info',JSON.stringify(res.data));
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setCollege(res.data.college);
          setGraduation(res.data.graduation);
          setSpec(res.data.specialization);
          setSkills(`${res.data.skill1},${res.data.skill2},${res.data.skill3},${res.data.skill4},${res.data.skill5}`);
        })
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  return (
    <div className="profile-container">
      <Navbar></Navbar>
      <form className="profile-form">
        <label className="name">Name:{name}</label>
        <label className="email">Email:{email}</label>
        <label className="phone">Phone:{phone}</label>
        <br />
        <br />
        <label className="college">College:{college}</label>
        <label className="gradu">Graduation:{graduation}</label>
        <br />
        <br />
        <label className="spec">Specialization:{spec}</label>
        <label className="skills">Skills:{skills}</label>
        <br />
        <br />
        <Link to="/home/profile/edit"><button id="edit">Edit</button></Link>
      </form>"
    </div>
  );
}

export default Profile;
