import "./profile.css"
import Navigation from "../Navigation/Navigation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Profile()
{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    let navigate=useNavigate();
    let user=JSON.parse(localStorage.getItem('token'));
    let id=user.token;

    React.useEffect(()=>{
       get();
    },[]);

    async function get()
    {
        try{
        await axios.get('http://localhost:4000/profile',{headers:{'token':id}})
        .then(user=>{
            setName(user.data.name);
            setEmail(user.data.email);
            setPhone(user.data.phone);
        })
        }
        catch(err)
        {
            console.log(err);
        }
    }
    function back(e)
  {
    e.preventDefault();
    navigate('/home/chats')
  }

    return (
        <div>
            <Navigation></Navigation>
            <section className="pro">
            <name className="n">Name:  {name}</name><br></br><br></br>
            <email className="e">Email: {email}</email><br></br><br></br>
            <phone className="p">Phone:  {phone}</phone><br></br>
            <button id="ba" onClick={back}>back</button>
            </section>
        </div>
    )
};

export default Profile;