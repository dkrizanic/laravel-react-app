import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});




const logout = () =>{
  axios.post('api/logout', {
    accessToken: localStorage.getItem('accessToken'),
  })
  .then((response) =>{
    localStorage.removeItem("accessToken");
    console.log(response.data.message);
  });
  window.location.href = '/';
}


function App() {
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
                    <Link to="/login" className="btn btn-success" >Login</Link>
                    <Link to="/register" className="btn btn-success marg-left marg-right">Register</Link>
                    <button className="btn btn-danger " onClick={logout} >
                      Logout
                    </button>

            </nav>
          </div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </Router>
      </div>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}