import "./navbar.css";
import Header from "../header/Header";
import { NavLink } from "react-router-dom";


function Navbar() {
  let user=JSON.parse(localStorage.getItem('user'));
  let n=user.name;
  let name=n[0].toUpperCase()+n.slice(1);

  function logout(e) {
    localStorage.removeItem("user");
    localStorage.removeItem("info");
  }

  return (
    <navigation className="navigation">
      <Header></Header>
      <NavLink to="/" className="out">
        <button id="logout" onClick={logout}>
          <i className="fa fa-sign-out"  aria-hidden="true"></i>
        </button>
      </NavLink>
      <NavLink
        to="/rec/profile"
        className="profile"
        id="profile"
      >
        <i class="fa fa-user" id="fa"> {name}</i>
      </NavLink>
      <section className="all-button">
        <NavLink to="/rec/postjob" className="alljobs">
          <button id="job-button" className="job">
            Post job
          </button>
        </NavLink>
        <NavLink to="/rec/yourjobs" className="sim">
          <button id="similar" className="similar">
            your Jobs
          </button>
        </NavLink>
        <NavLink to="/rec/interested" className="app">
          <button id="applied-button" className="applied-b">
            Interested
          </button>
        </NavLink>
      </section>
      <br></br>
    </navigation>
  );
}

export default Navbar;
