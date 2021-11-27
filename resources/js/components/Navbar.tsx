import './app.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';



function Navbar() {

  const [authState, setAuthState] = useState(false);

  useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
      setAuthState(false);
    }else{
      setAuthState(true);
    }
    
  });

  const logout = () =>{
    axios.post('api/logout')
    .then((response) =>{
      if(response.data.status === 200){
        console.log(response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        window.location.href = '/';
      }
    });
  }
  
  return (
      <div className="App">
          <div className="page-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav mr-auto marg-left">
                    <li className="nav-item active">
                    <Link to="/" className="nav-link"><strong>Home</strong></Link>
                    </li>
                    <div className="people-icon">
                      <Link to="/addWorker" className="nav-link"><i className="fas fa-user-plus"></i></Link>
                    </div>
                </ul>
                    
                  {!authState ? (
                    <>
                      <Link to="/login" className="btn btn-info" >Login</Link>
                      <Link to="/register" className="btn btn-info marg-left marg-right">Register</Link>
                    </>
                  ) : (
                    <>
                      <div className="marg-welcome">
                        <Link to="/userProfile" className="username">{localStorage.getItem('username')}</Link>
                      </div>
                      <div className="marg-right">
                        <button className="btn btn-danger" onClick={logout} >
                          Logout
                        </button>
                      </div>
                    </>
                )}

            </nav>
          </div>
      </div>
  );
}

export default Navbar;


