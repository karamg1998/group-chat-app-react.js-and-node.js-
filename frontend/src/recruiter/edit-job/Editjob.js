import "./editjob.css";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function EditJob() {
  const [position,setPosition]=useState('');
  const [location,setLocation]=useState('');
  const [qualification,setQualification]=useState('');
  const [experience,setExperience]=useState('');
  const [desc,setDesc]=useState('');
  let Id=useParams().id; 
  let navigate=useNavigate();
  let user=JSON.parse(localStorage.getItem('user'));
  let token=user.token;

  useEffect(()=>{
      let details=JSON.parse(localStorage.getItem('details'));
      setDesc(details.description);
      setExperience(details.experience);
      setLocation(details.location);
      setPosition(details.job);
      setQualification(details.qualification);
  },[])

  async function update(e)
  {
    e.preventDefault();
    let obj={position,location,qualification,experience,desc,Id,token}
    try{
      await axios.post('http://localhost:4000/job/update',obj)
      .then(res=>{
        if(res.data.success===true)
        {
          localStorage.removeItem('details');
          popup(res.data.message);
          setTimeout(()=>{
            navigate('/rec/yourjobs');
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

  function back()
  {
    localStorage.removeItem('details');
    navigate('/rec/yourjobs/details/'+Id);
  }

  return (
    <div className="job-container">
      <Navbar></Navbar>
      <form className="job-post-form">
        <label className="position">Position:</label>
        <input value={position} type='text' id="position" name="position" onChange={(e)=>{setPosition(e.target.value)}}></input><br/><br/>
        <label className="location">Location:</label>
        <input value={location} type="text" id="location" name="location" onChange={(e)=>{setLocation(e.target.value)}}></input><br/><br/>
        <label className="qualification">Qualification:</label>
        <input value={qualification} type="text" id="qualification" name="qualification" onChange={(e)=>{setQualification(e.target.value)}}></input><br/><br/>
        <label className="experience">Experience:</label>
        <input value={experience} type="text" id="experience" name="experince" onChange={(e)=>{setExperience(e.target.value)}}></input><br/><br/>
        <label className="desc">Description:</label><br/><br/>
        <textarea value={desc} type="text" id="desc" name="desc" onChange={(e)=>{setDesc(e.target.value)}}></textarea><br/><br/>
        <button id="post" onClick={back}>Back</button>
        <button id="post" onClick={update}>Update</button>
      </form>
    </div>
  );
}

export default EditJob;
