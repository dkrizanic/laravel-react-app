import './app.css';
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import CreateProject from './project/CreateProject';
import UserProfile from './user/UserProfile';
import ChangePassword from './user/ChangePassword';
import Project from './project/Project';
import AddWorkers from './group/AddWorkers';
import ProjectSettings from './project/ProjectSettings';
import AddTask from './project/AddTask';
import Groups from './group/Groups';
import GroupOperations from './group/GroupOperations';
import Navbar from './Navbar';
import Workers from './group/Workers';
import Worker from './group/Worker';
import PasswordReset from './group/PasswordReset';
import Task from './project/Task';
import WorkerTask from './project/WorkerTask';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {

  const [status, setStatus] = useState<boolean>(false);
  const CryptoJS = require("crypto-js");
  useEffect(()=>{
    if(localStorage.getItem('status')){
      let bytes = CryptoJS.AES.decrypt(localStorage.getItem('status'), 'my-secret-key@123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if(decryptedData === 1){
        setStatus(true);
        console.log("admin");
        console.log(status);
      }else{
        setStatus(false);
        console.log("worker");
        console.log(status);
      }
    }

    
  }, []);



  return (
    <Router>
      <Navbar/>
      <Routes>
      {status ? (
          <>
              <Route path='*' element={<Home />} />
              <Route path='/' element={<Home />} />
              <Route path='/addWorkers' element={<AddWorkers/>} />
              <Route path='/project-settings' element={<ProjectSettings/>} />
              <Route path='/groups' element={<Groups/>} />
              <Route path='/groups/:id/:group_name' element={<GroupOperations/>} />
              <Route path='/workers' element={<Workers/>} />
              <Route path='/workers/worker' element={<Worker/>} />
              <Route path='/create-project' element={<CreateProject/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/user-profile' element={<UserProfile/>} />
              <Route path='/user-profile/change-password' element={<ChangePassword/>} />
              <Route path='/project' element={<Project/>} />
              <Route path='/project/create-task/:id' element={<AddTask/>} />
              <Route path='/workers/worker/password-reset/:id' element={<PasswordReset/>} />
              <Route path='/project/task' element={<Task/>} />
          </>
        ) : (
          <>
              <Route path='*' element={<Home />} />
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/user-profile' element={<UserProfile/>} />
              <Route path='/user-profile/change-password' element={<ChangePassword/>} />
              <Route path='/project' element={<Project/>} />
              <Route path='/worker-task' element={<WorkerTask/>} />
          </>
      )}
      </Routes>
  </Router>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

