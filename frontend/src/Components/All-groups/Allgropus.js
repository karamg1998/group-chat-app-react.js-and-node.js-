import "./allgroups.css"
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";


function Allgroups()
{
    let navigate=useNavigate();
    const [data,setData]=useState([]);
    let user=JSON.parse(localStorage.getItem('token'));
    let token=user.token;

    React.useEffect(()=>{
        getGroup();
      },[]);
      
      async function getGroup()
      {
          try{
              await axios.get('http://localhost:4000/getGroups',{headers:{'token':token}})
              .then(g=>{
                setData(g.data);
              })
          }
          catch(err)
          {
              console.log(err);
          }
      }

    function create(e)
    {
        e.preventDefault();
        navigate('/home/groups/create')
    }

    function gchat(e)
    {
      e.preventDefault();
      let id=e.target.parentElement.id;
      let name=e.target.previousElementSibling.innerText;
      localStorage.setItem('group',name);
      navigate(`/home/groups/${id}`);
    }

    return(
        <div>
           <Navigation></Navigation><br></br>
           <div className="cr-gr">
            <button id="cr" onClick={create}>Create Group</button>
           </div>
           <section className="ag">
           {data.map((i,j)=>{
            return(
                <div className='group-container' id={i.groupId}>
                    <span className='group-name'><i class="fa fa-users" aria-hidden="true"></i> {i.groupName}</span>
                    <button id="g-chat" onClick={gchat}>Chat</button>
                </div>)
           })}
           </section>
        </div>
    )
}

export default Allgroups;