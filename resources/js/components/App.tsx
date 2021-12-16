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
import TaskList from './task/TaskList';
import AddWorkers from './user/AddWorkers';
import ProjectSettings from './project/ProjectSettings';
import Groups from './user/Groups';
import GroupOperations from './user/GroupOperations';
import Navbar from './Navbar';
import ListOfWorkers from './user/ListOfWorkers';
import NotFound from './NotFound';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {

  const [status, setStatus] = useState(false);
  const CryptoJS = require("crypto-js");
  useEffect(()=>{
    if(localStorage.getItem('status')){
      let bytes = CryptoJS.AES.decrypt(localStorage.getItem('status'), 'my-secret-key@123');
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if(decryptedData === 1){
        setStatus(true)
      }else{
        setStatus(false);
      }
    }
    if(!localStorage.getItem('accessToken')){
      setStatus(false);
    }else{
      setStatus(true);
    }
    
  }, []);

  return (
          <Router>
            <Navbar/>
            {status ? (
                    <>
                      <Routes>
                        <Route path='*' element={<NotFound />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/addWorker' element={<AddWorkers/>} />
                        <Route path='/projectSettings' element={<ProjectSettings/>} />
                        <Route path='/groups' element={<Groups/>} />
                        <Route path='/groupOperations' element={<GroupOperations/>} />
                        <Route path='/listOfWorkers' element={<ListOfWorkers/>} />
                        <Route path='/createProject' element={<CreateProject/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/userProfile' element={<UserProfile/>} />
                        <Route path='/changePassword' element={<ChangePassword/>} />
                        <Route path='/taskList' element={<TaskList/>} />
                      </Routes>
                    </>
                  ) : (
                    <>
                      <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/userProfile' element={<UserProfile/>} />
                        <Route path='/changePassword' element={<ChangePassword/>} />
                        <Route path='/taskList' element={<TaskList/>} />
                      </Routes>
                    </>
                )}
          </Router>
  );
}

export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}