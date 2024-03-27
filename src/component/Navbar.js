import React, { useEffect } from 'react';
import {Link,useLocation,useNavigate } from 'react-router-dom';

const Navbar = () => {
  var nevigate=useNavigate();
  var location=useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[location])



  const clicklogout=()=>{
    localStorage.removeItem('token');
    nevigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
  <div className="container-fluid">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname ==="/" ?'active':''}`}  to="/login">Home</Link>
      </li>
     <li className="nav-item">
        <Link className={`nav-link ${location.pathname ==="/about" ?'active':''}`} to="/about">About us</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>

    {!localStorage.getItem('token') ?
    <form className="d-flex">
   <Link to="/login"> <button className="btn btn-primary mx-2" type="button">Login</button></Link>
    
   <Link to="/signup"><button className="btn btn-primary mx-2" type="button">Sign up</button></Link>
      </form>     :

       <button className="btn btn-primary mx-2" type="button" onClick={clicklogout}>Logout</button>
       }
  </div>
</nav>

    </div>
  );
}

export default Navbar;
