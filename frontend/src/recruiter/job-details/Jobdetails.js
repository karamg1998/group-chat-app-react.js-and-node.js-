import './jobdetails.css'
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Details(){
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
    })

    async function fetch()
    {
        
        try{
            await axios.get(`http://localhost:4000/job/${Id.id}`)
            .then(res=>{
                localStorage.setItem('details',JSON.stringify(res.data));
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
         navigate('/rec/yourjobs');
    }
    function Edit()
    {
        navigate('/rec/yourjobs/details/edit/'+Id.id)
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
            <button id='e' onClick={Edit}>Edit</button>
         </div>
        </div>
        
    );
}

export default Details;