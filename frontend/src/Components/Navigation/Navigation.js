import "./navigation.css";
import Header from "../Header/Header";
import { NavLink, useNavigate } from "react-router-dom";


function Navigation() {
    let navigate=useNavigate();
    let user=JSON.parse(localStorage.getItem('token'));
    let n=user.name;
    let name=n[0].toUpperCase()+n.slice(1);

    function logout(e)
    {
       e.preventDefault();
       localStorage.removeItem('token');
       navigate('/');
    }

    return (
        <navigation className="navigation">
            <Header></Header>
            <NavLink><button className="lo" onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i></button></NavLink>
            <NavLink
                to="/home/profile"
                className="profile"
                id="profile"
            >
                <i class="fa fa-user" id="fa"> {name}</i>
            </NavLink>
            <section className="all-button">
                <NavLink to="/home/chats" className="allchats">
                    Chats
                </NavLink>
                <NavLink to="/home/groups" className="group">
                    Groups
                </NavLink>
            </section>
            <br></br>
        </navigation>
    )
}

export default Navigation;