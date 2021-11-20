import './app.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import CreateProject from './project/CreateProject';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {

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
          <Router>
          <div className="page-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav mr-auto marg-left">
                    <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                    </li>
                </ul>
                    
                  {!authState ? (
                    <>
                      <Link to="/login" className="btn btn-info" >Login</Link>
                      <Link to="/register" className="btn btn-info marg-left marg-right">Register</Link>
                    </>
                  ) : (
                    <>
                      <div className="marg-welcome">
                          <h3>{localStorage.getItem('username')}</h3>
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
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/createProject' component={CreateProject} />
            </Switch>
          </Router>
      </div>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}