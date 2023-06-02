import "./profile.css";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import React, {  useState , useEffect} from "react";
import axios from "axios";

function Recprofile() {
 
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  let [firm,setFirm]=useState('');
  let [designation,setDesignation]=useState('');
  

 useEffect(()=>{
    fetch();
  });

let user=JSON.parse(localStorage.getItem('user'));
  async function fetch()
  {
    try{
        await axios.get("http://localhost:4000/recinfo",{headers:{'token':user.token}})
        .then(res=>{
          console.log(res.data)
          localStorage.setItem('info',JSON.stringify(res.data));
          setName(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setFirm(res.data.firm);
          setDesignation(res.data.designation);
        })
    }
    catch(err){
        console.log(err);
    }
  };
  
  return (
    <div className="profile-container">
      <Navbar></Navbar>
      <form className="profile-form">
        <label className="name">Name:{name}</label>
        <label className="email">Email:{email}</label>
        <label className="phone">Phone:{phone}</label>
        <br />
        <br />
        <label className="firm">Company:{firm}</label>
        <label className="desig">Designation:{designation}</label>
        <br />
        <br />
        <Link to="/rec/profile/edit"><button id="edit">Edit</button></Link>
      </form>"
    </div>
  );
}

export default Recprofile;
