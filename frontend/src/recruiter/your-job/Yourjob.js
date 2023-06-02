import './yourjob.css'
import Navbar from '../navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function YourJobs()
{
    let navigate=useNavigate();
    const [data,setData]=useState([])
    
    useEffect(()=>{
     fetch();  
     },[]);
  
     async function fetch()
     {
        let user=JSON.parse(localStorage.getItem('user'));
        try{
            await axios.get('http://localhost:4000/job/yourjobs',{headers:{'token':user.token}})
            .then(res=>{
                console.log(res.data);
                setData(res.data);
            })
        }
        catch(err)
        {
            console.log(err);
        }
     }

    function details(e)
     {
        navigate('/rec/yourjobs/details/'+e.target.parentElement.id);
     }

     async function Delete(e)
     {
       let Id=e.target.parentElement.id;
       try{
        await axios.delete(`http://localhost:4000/job/del/${Id}`)
       .then(res=>{
        console.log(res.data);
        if(res.data.success===true)
        {
            popup(res.data.message);
            e.target.parentElement.remove();
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
        <div className="applied-jobs">
        <Navbar></Navbar>
        <section className='job-container'>
           {data.map((d,i)=>{
            return(
            <div className='your-j' id={d.id} >
                <span className='jobname'>{d.job}</span>
                <span className='loc'><i class='fa fa-map-marker'></i> {d.location}</span>
                <span className='quali'>Minimum Qualification: {d.qualification}</span>
                <span className='exp'>Experience: {d.experience}</span>
                <button id='details' onClick={details}>Details</button>
                <button id='del' onClick={Delete}>Delete</button>
            </div>)
             
           })}
        </section>
        </div>
    );
}

export default YourJobs;