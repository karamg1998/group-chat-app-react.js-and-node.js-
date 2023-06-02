import './jobdetails.css'
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function JobDetails(){
    let user=JSON.parse(localStorage.getItem('user'));
 const [id,setId]=useState('');
 const [job,setJob]=useState('');
 const [location,setLoacation]=useState('');
 const [qualification,setQualification]=useState('');
 const [experience,setExperience]=useState('');
 const [description,setDecription]=useState('');
 let navigate=useNavigate();
 let Id=useParams();

    useEffect(()=>{
        fetch();
    },[])

    async function fetch()
    {
        
        try{
            await axios.get(`http://localhost:4000/job/${Id.id}`)
            .then(res=>{
                setId(res.data.id);
                setDecription(res.data.description);
                setExperience(res.data.experience);
                setJob(res.data.job);
                setLoacation(res.data.location);
                setQualification(res.data.qualification);
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
    function Back()
    {
         navigate('/home/alljobs');
    }

    async function ap()
    {
        let userToken=user.token;
        let jobToken=Id.id;

        let obj={userToken,jobToken};
        try{
            await axios.post('http://localhost:4000/job/apply',obj)
            .then(res=>{
                if(res.data.success===true)
                {
                    popup(res.data.message);
                    setTimeout(()=>{
                        navigate('/home/appliedjobs');
                    },1000);
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
        <div>
          <Navbar></Navbar>
          <div className='details' id={id}>
            <span className='j'>Job: {job}</span><br></br><br></br>
            <span className='l'>Location: {location}</span><br></br><br></br>
            <span className='q'>qualification:{qualification}</span><br></br><br></br>
            <span className='e'>Experience: {experience}</span><br></br><br></br>
            <span className='d'>Description: {description}</span><br></br><br></br>
            <button id='b' onClick={Back}>Back</button>
            <button id='apply' onClick={ap}>Apply</button>
         </div>
        </div>
        
    );
}

export default JobDetails;