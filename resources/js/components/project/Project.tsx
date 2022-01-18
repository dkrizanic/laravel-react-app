import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from 'react-router-dom';



function Project() {
    const location = useLocation()
    interface IState {
        tasks: {
            id: number;
            task_name: string;
            work_time: number;
            description: string;
        }[]
    }
    
    const [tasks, setListOfTasks] = useState<IState["tasks"]>([]);

    useEffect(()=>{
        axios.get(`/api/tasks/${location.state.id}`)
        .then((response) =>{
          if(response.data.status === 200){
            setListOfTasks(response.data.task_list);
            console.log(response.data.message);
          }else{
            console.log(response.data.message);
          }
        })
        
      }, []);
    return (
        <div className="data">
            <h1>{location.state.project_name} project tasks<Link to={`/project/create-task/${location.state.id}`} className="btn btn-info marg-left" title='Create task'>  +  </Link></h1>
            <hr></hr>
            {tasks.map((value, key) => {
                return (
                <div className="jumbotron jumbotron-fluid con-size fadeIn first" key={key}>
                    <div className="container">
                        <h1 className="display-12"><Link to="/project/task"  state={tasks[key]}> {value.task_name} </Link></h1>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default Project;


