import './app.css';
import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import CreateProject from './project/CreateProject';
import UserProfile from './user/UserProfile';
import ChangePassword from './user/ChangePassword';
import TaskList from './task/TaskList';
import AddWorkers from './user/AddWorkers';
import ProjectSettings from './project/ProjectSettings';
import Groups from './user/Groups';
import GroupData from './user/GroupData';
import Navbar from './Navbar';
import ListOfWorkers from './user/ListOfWorkers';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {

  return (
          <Router>
            <Navbar/>

            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/createProject' component={CreateProject} />
              <Route path='/userProfile' component={UserProfile} />
              <Route path='/changePassword' component={ChangePassword} />
              <Route path='/taskList' component={TaskList} />
              <Route path='/addWorker' component={AddWorkers} />
              <Route path='/projectSettings' component={ProjectSettings} />
              <Route path='/groups' component={Groups} />
              <Route path='/groupData' component={GroupData} />
              <Route path='/listOfWorkers' component={ListOfWorkers} />
            </Switch>
          </Router>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}