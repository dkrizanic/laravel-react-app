
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';




function App() {
  return (
      <div className="App">
          <Router>
          <div className="page-header">
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>

                    </li>
                </ul>
                    <Link to="/login" className="btn btn-success button" >Login</Link>
                    <Link to="/register" className="btn btn-success ">Register</Link>

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



// DOM element
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}