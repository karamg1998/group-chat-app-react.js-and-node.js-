import './alljobs.css'
import Navbar from '../navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllJobs()
{
    let navigate=useNavigate();
    const [data,setData]=useState([])
    let user=JSON.parse(localStorage.getItem('user'));
;

    useEffect(()=>{
     AJ();  
     },[]);
  
     async function AJ()
     {  
        try{
            await axios.get('http://localhost:4000/alljobs',{headers:{'token':user.token}})
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
        navigate('/home/alljobs/details/'+e.target.parentElement.id);
     }

    async function apply(e)
     {
        let userToken=user.token;
        let jobToken=e.target.parentElement.id;

        let obj={userToken,jobToken};
        try{
            await axios.post('http://localhost:4000/job/apply',obj)
            .then(res=>{
                console.log(res.data);
                if(res.data.success===true)
                {
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

    return(
        <div className="applied-jobs">
        <Navbar></Navbar>
        <section className='job-container'>
           {data.map((d,i)=>{
            return(
            <div className='your' id={d.id}>
                <span className='jobname'>{d.job}</span>
                <span className='loc'><i class='fa fa-map-marker'></i> {d.location}</span>
                <span className='quali'>Minimum Qualification: {d.qualification}</span>
                <span className='exp'>Experience: {d.experience}</span>
                <span className='re'>Recruiter: {d.recruiter}</span>
                <button id='details' onClick={details}>Details</button>
                <button id='apply' onClick={apply}>Apply</button>
            </div>)
             
           })}
        </section>
        </div>
    );
}

export default AllJobs;
