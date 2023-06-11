import { useState } from 'react'
import Header from '../Components/Header/Header';
import './forgot.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgot() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    async function forgot(e) {
        e.preventDefault();
        if (email === '') {
            popup('email cannot be empty');
            return;
        }
        else if (phone === '') {
            popup('phone cannot be empty');
            return;
        }
        else {
            try {
                axios.get('http://localhost:4000/forgot', { headers: { 'phone': phone, 'email': email } })
                    .then(r => {
                        console.log(r.data);
                        if (r.data.success === true) {
                            navigate(`/forgot/${r.data.forgot}`)
                        }
                        else {
                            popup(r.data.m);
                        }
                    })
            }
            catch (err) {
                console.log(err);
            }
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
    };

    return (
        <div className="signup">
            <Header></Header>
            <br />
            <br />
            <form className="form">
                <label className="email">Email:</label>
                <input
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <br />
                <br />
                <label className="phone">Phone:</label>
                <input
                    value={phone}
                    type="phone"
                    id="phone"
                    name="phone"
                    onChange={(e) => { setPhone(e.target.value) }}
                />
                <br />
                <br />
                <button id='f' onClick={forgot}>Reset</button>
            </form>
        </div>
    )
}

export default Forgot;