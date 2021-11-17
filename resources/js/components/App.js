import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';

const logout = () =>{
  axios.post('api/logout')
  .then((response) =>{
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