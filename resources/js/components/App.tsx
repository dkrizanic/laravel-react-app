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
import AddWorkers from './group/AddWorkers';
import ProjectSettings from './project/ProjectSettings';
import Groups from './group/Groups';
import GroupOperations from './group/GroupOperations';
import Navbar from './Navbar';
import ListOfWorkers from './group/ListOfWorkers';
import UpdateGroup from './group/UpdateGroup';
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
                        <Route path='/addWorkers' element={<AddWorkers/>} />
                        <Route path='/projectSettings' element={<ProjectSettings/>} />
                        <Route path='/groups' element={<Groups/>} />
                        <Route path='/groupOperations/:id/:group_name' element={<GroupOperations/>} />
                        <Route path='/listOfWorkers' element={<ListOfWorkers/>} />
                        <Route path='/createProject' element={<CreateProject/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/userProfile' element={<UserProfile/>} />
                        <Route path='/changePassword' element={<ChangePassword/>} />
                        <Route path='/taskList' element={<TaskList/>} />
                        <Route path='/updateGroup' element={<UpdateGroup/>} />
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