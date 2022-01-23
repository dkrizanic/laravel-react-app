import './app.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function Home() {

  interface IState {
    project: {
      project_name: string;
      finish_date: Date;
      start_date: Date;
      status: number;
      id: number;
    }[],

    tasks: {
      task_name: string;
      id: number;
    }[]
  }

  let navigate = useNavigate();
  const [project, setListOfProjects] = useState<IState["project"]>([]);
  const [tasks, setListOfTasks] = useState<IState["tasks"]>([]);
  const [status, setStatus] = useState(false);
  const CryptoJS = require("crypto-js");

    useEffect(()=>{
      if(localStorage.getItem('status')){
        let bytes = CryptoJS.AES.decrypt(localStorage.getItem('status'), 'my-secret-key@123');
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if(decryptedData === 1){
          setStatus(true);
          axios.get("/api/projects")
          .then((response) =>{
            if(response.data.status === 200){
              setListOfProjects(response.data.project_list);
              console.log(response.data.message);
            }else{
              console.log(response.data.message);
            }
          })
        }else{
          axios.get("/api/tasks")
          .then((response) =>{
            if(response.data.status === 200){
              setListOfTasks(response.data.task_list);
              console.log(response.data.task_list);
            }else{
              console.log(response.data.message);
            }
          })
          setStatus(false);
        }
      }else{
        navigate('/login');
      }
    }, []);

    return (
      <div className="data">
          {status ? (
            <>
              <div className="jumbotron jumbotron-fluid con-size">
                <div className="container">
                  <h1 className="display-12">Make new project <Link to="/create-project" className="btn btn-info marg-left" >  +  </Link></h1>
                </div>
              </div>
              {project.map((value, key) => {
                  return (
                    <div className="jumbotron jumbotron-fluid con-size fadeIn first" key={key}>
                      <div className="container">
                        <h1 className="display-12"><Link to="/project"  state={project[key]}> {value.project_name} </Link></h1>
                        <p className="lead"> {value.start_date} : {value.finish_date}</p>
                        
                        <Link to="/project-settings" state={project[key]}><i className="fas fa-cog"></i></Link>
                      </div>
                    </div>
                  );
              })}
            </>
          ) : (
            <>
               {tasks.map((value, key) => {
                  return (
                    <div className="jumbotron jumbotron-fluid con-size fadeIn first" key={key}>
                      <div className="container">
                        <h1 className="display-12"><Link to="/worker-task"  state={tasks[key]}> {value.task_name} </Link></h1>
                      </div>
                    </div>
                  );
              })}
            </>
        )}
      </div>
    );
}

export default Home;


