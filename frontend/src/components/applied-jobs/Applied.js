import './applied.css'
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AppliedJobs()
{
    let navigate=useNavigate()
    const [data,setData]=useState([]);
    let user=JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        fetch();
    },[])
  
    async function fetch()
    {
        try{
          await axios.get('http://localhost:4000/appliedjobs',{headers:{'token':user.token}})
          .then(res=>{
            console.log('yes',res.data);
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
       navigate('/home/appliedjobs/details/'+e.target.parentElement.id);
    }
    return(
        <div className="applied-jobs">
        <Navbar></Navbar>
        <section className='job-container'>
           {data.map((d,i)=>{
            return(
            <div className='applied-j' id={d.id}>
                <span className='j'>{d.job}</span>
                <span className='l'><i class='fa fa-map-marker'></i> {d.location}</span>
                <span className='q'>Minimum Qualification: {d.qualification}</span>
                <span className='e'>Experience: {d.experience}</span>
                <button id='b' onClick={details}>Details</button>
            </div>)
             
           })}
        </section>
        </div>
    );
}

export default AppliedJobs;