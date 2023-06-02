import './interested.css'
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Interested()
{
    let user=JSON.parse(localStorage.getItem('user'));
    const [data,setData]=useState([]);

    useEffect(()=>{
        get();
    },[])

    async function get()
    {
       try{
            axios.get('http://localhost:4000/getappliers',{headers:{'token':user.token}})
            .then(res=>{
                console.log('ys',res.data)
                setData(res.data);
                
            })
       }
       catch(err)
       {
        console.log(err);
       }
    }

    return(
        <div className="similar-jobs">
        <Navbar></Navbar>
        <section className='applier'>
            {data.map((d,i)=>{
                return(
              <div className='can-con' id={d.jobId}>
                <span className='jobName'>Job: {d.jobName}</span>
                <span className='Locat'>Location: {d.location}</span>
                <span className='nam'>Name: {d.name}</span>
                <span className='emai'>Email: {d.email}</span>
                <span className='phon'>Phone: {d.phone}</span>
              </div>
              );
            })}
        </section>
        </div>
    );
}

export default Interested;