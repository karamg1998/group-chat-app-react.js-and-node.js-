import { useState } from "react";
import React from "react";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import "./allchats.css"
import { useNavigate } from "react-router-dom";

function Allchats()
{
    let navigate=useNavigate();
    const [data,setData]=useState([]);
    let user=JSON.parse(localStorage.getItem('token'));
    let token=user.token;

    React.useEffect(()=>{
        getUsers();
    },[])

    async function getUsers()
    {
        try{
           await axios.get('http://localhost:4000/getusers',{headers:{'token':token}})
            .then(users=>{
                console.log(users.data);
                setData(users.data);
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }

    function chat(e)
    {
      let id=e.target.parentElement.id;
      navigate(`/home/chats/${id}`)
    }

    return(
        <div>
            <Navigation></Navigation>
            <section className="ac">
                {data.map((d,i)=>{
            return(
            <div className='user' id={d.id}>
                <span className='user-name'><i class="fa fa-user" id="fa"></i> {d.name}</span>
                <button id="chat" onClick={chat}>Chat</button>
            </div>)
           })};
            </section>
        </div>
    );
}


export default Allchats;