import "./postjobs.css";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PostJobs() {
  const [position,setPosition]=useState('');
  const [location,setLoacation]=useState('');
  const [qualification,setQualification]=useState('');
  const [experience,setExperience]=useState('');
  const [desc,setDesc]=useState('');

  let navigate=useNavigate();

  let user=JSON.parse(localStorage.getItem('user'));
  let token=user.token;
  async function post(e)
  {
    e.preventDefault();
    let obj={position,location,qualification,desc,experience,token};
    try{
      axios.post('http://localhost:4000/job/post',obj)
      .then(res=>{
        console.log(res.data);
        if(res.data.success===true)
        {
          setPosition('');
          setLoacation('');
          setQualification('');
          setDesc('');
          popup(res.data.message);
          setTimeout(()=>{
           navigate('/rec/yourjobs')
          },1000)
        }
        else{
          popup(res.data.message);
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
    <div className="job-container">
      <Navbar></Navbar>
      <form className="job-post-form">
        <label className="position">Position:</label>
        <input value={position} type='text' id="position" name="position" onChange={(e)=>{setPosition(e.target.value)}}></input><br/><br/>
        <label className="location">Location:</label>
        <input value={location} type="text" id="location" name="location" onChange={(e)=>{setLoacation(e.target.value)}}></input><br/><br/>
        <label className="qualification">Qualification:</label>
        <input value={qualification} type="text" id="qualification" name="qualification" onChange={(e)=>{setQualification(e.target.value)}}></input><br/><br/>
        <label className="experience">Experience:</label>
        <input value={experience} type="text" id="experience" name="experince" onChange={(e)=>{setExperience(e.target.value)}}></input><br/><br/>
        <label className="desc">Description:</label><br/><br/>
        <textarea value={desc} type="text" id="desc" name="desc" onChange={(e)=>{setDesc(e.target.value)}}></textarea><br/><br/>
        <button id="post" onClick={post}>Post</button>
      </form>
    </div>
  );
}

export default PostJobs;
