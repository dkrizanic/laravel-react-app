
import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

function Task() {

    let navigate = useNavigate();
    const location = useLocation()
    const [name, setName] = useState(location.state.task_name);
    const [work_time, setWorkTime] = useState(location.state.work_time);
    const [description, setDescription] = useState(location.state.description);
    const [task_status, setStatus] = useState(location.state.task_status);
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
        if(task_status === 2){
            setFlag(true);
        }
        
    }, []);


    const deleteTask = () =>{
        axios.delete(`/api/task/${location.state.id}`, {
        })
        .then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                navigate(-1);
            }else{
                console.log("task not deleted");
            }
        })
    }

    const updateTask = () => {
        if(name === '' || description === ''){

        }else{
            axios.put('/api/task', {
                name: name,
                description: description,
                work_time: work_time,
                id: location.state.id
    
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    navigate(-1);
                }else{
                    console.log("update task failed");
                }
            });
        }
    }

    const checker = () =>{
        let text = "Are you sure you want to delete task?";
        if (confirm(text) == true) {
            deleteTask();
        }
    }

    const change_status = () =>{
        if(name === '' || description === ''){

        }else{
            axios.put('/api/status', {
                id: location.state.id
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    navigate(-1);
                }else{
                    console.log("status change failed");
                }
            });
        }
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" value={name} title="name" required onChange={(event) => {
                setName(event.target.value);}}></input>
                <input type="number" id="text" className="fadeIn first" value={work_time} placeholder='work time' title="work time" required onChange={(event) => {
                setWorkTime(event.target.value);}}></input>
                <input type="text" id="text" className="fadeIn first" value={description} title="description" required onChange={(event) => {
                setDescription(event.target.value);}}></input>
                <div className="marg-up ">
                    <button className=" btn btn-info" onClick={updateTask}> Save </button>  
                </div>
                <div className="marg-up-inp" >
                    <button className="btn btn-danger" onClick={checker}> Delete task </button>
                </div>
                {flag ? (
                    <>
                    <div>
                        <button className="btn btn-info" onClick={change_status}> Unfinished </button>  
                    </div>
                    </>
                  ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    );
}

export default Task;


