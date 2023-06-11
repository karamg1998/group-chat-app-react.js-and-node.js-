import './allmembers.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

function Allmembers() {
    let navigate=useNavigate();
    const [data, setData] = useState([]);
    const [phone, setPhone] = useState('');
    const [admin, setAdmin] = useState('');
    let id = useParams().id;
    let user = JSON.parse(localStorage.getItem('token'));
    let token = user.token;
    let group = localStorage.getItem('group');

    React.useEffect(() => {
        fetch();
        get();
    },[])

    useEffect(() => {
        let interval = setInterval(() => {
            fetch()
        }, 1000);

        return () => { clearInterval(interval) }
    })

    async function get() {
        try {
            axios.get('http://localhost:4000/isadmin', { headers: { 'group': id, 'user': token } })
                .then(r => {
                    console.log(r.data);
                    setAdmin(r.data.admin);
                })
        }
        catch (err) {

        }
    }

    async function fetch() {
        try {
            axios.get('http://localhost:4000/get-mem', { headers: { 'group': id } })
                .then(r => {
                    console.log(r.data);
                    setData(r.data);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    async function add(e) {
        e.preventDefault();
        let obj = { id, phone, group };
        if (!phone) {
            popup('phone cannot be empty');
            return;
        }
        else {
            try {
                axios.post('http://localhost:4000/addmem', obj)
                    .then(r => {
                        console.log(r);
                        popup(r.data.m);
                    })
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async function makeAdmin(e) {
        e.preventDefault();
        let userId = e.target.parentElement.parentElement.id;

        try {
            axios.get('http://localhost:4000/make-admin', { headers: { 'userId': userId, 'groupId': id } })
                .then(r => {
                    console.log(r.data);
                    popup(r.data.m);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    async function rem(e) {
        e.preventDefault();
        let userId = e.target.parentElement.parentElement.id;
        try {
            await axios.get('http://localhost:4000/rem', { headers: { 'user': userId, 'group': id } })
                .then(r => {
                    console.log(r.data);
                    popup(r.data.m);
                })
        }
        catch (err) {
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

async function del(e)
{
    e.preventDefault();
    try{
        axios.get('http://localhost:4000/delg',{headers:{'group':id}})
        .then(r=>{
           if(r.data.success===true)
           {
            navigate('/home/groups');
            popup('group deleted successfully')
           }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

async function leave(e)
{
    e.preventDefault();
    try{
        await axios.get('http://localhost:4000/leave',{headers:{'user':token,'group':id}})
        .then(r=>{
            if(r.data.success===true)
            {
                popup(r.data.m);
                navigate('/home/groups');
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

    if (admin === true) {
        return (
            <div>
                <Header></Header>
                <div>
                    <div className='add-me'>
                        <input type='phone' name='phone' id='pn' className='group-n' placeholder='enter phone...' value={phone} onChange={(e) => { setPhone(e.target.value) }}></input>
                        <button id='am' onClick={add}>Add</button><br></br><br></br>
                        <button id='lg' onClick={leave}>Leave group</button>
                        <button id='dg' onClick={del}>Delete Group</button>
                    </div>
                    <section className='members'>
                        {data.map((i, j) => {
                            if (i.admin === 'true') {
                                return (
                                    <div id={i.uId}>
                                        <button className='mem'>{i.name}</button>
                                        <ul className='adm'>Admin</ul>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div id={i.uId}>
                                        <button className='mem'>{i.name}</button>
                                        <span className='n-adm'>
                                            <button id='ma' onClick={makeAdmin}>Make Admin</button>
                                            <button id='r' onClick={rem}>Remove</button>
                                        </span>
                                    </div>
                                )
                            }
                        })}
                    </section>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Header></Header>
                <div>
                <button id='lgn'onClick={leave}>Leave group</button>
                    <section className='members'>
                        {data.map((i, j) => {
                            if (i.admin === 'true') {
                                return (
                                    <div id={i.uId}>
                                        <button className='mem'>{i.name}</button>
                                        <ul className='adm'>Admin</ul>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div id={i.uId}>
                                        <button className='mem'>{i.name}</button>
                                        <span className='n-adm'>
                                        </span>
                                    </div>
                                )
                            }
                        })}
                    </section>
                </div>
            </div>
        )
    }

}

export default Allmembers;