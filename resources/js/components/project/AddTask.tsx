import './project.css';
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';



function AddTask() {
    const params = useParams()
    const [name, setName] = useState("");
    const [work_time, setWorkTime] = useState("");
    const [description, setDescription] = useState("");
    const [worker, setWorker] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);


    const newTask = () => {
        if(name === ''){

        }else{
            axios.post('/api/task', {
                id: params.id,
                name: name,
                work_time: work_time,
                description: description,
    
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    setName("");
                    setDescription("");
                    setWorkTime("");
                    setSuccess(true);
                }else{
                    console.log("create task failed");
                }
            });
        }
    }
    return (
        <div className="data">
            {success ? (
                    <>
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Task added</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    </>
                  ) : (
                    <>
                    </>
                )}
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <input type="text" id="text" className="fadeIn first" value={name} placeholder="Task" required onChange={(event) => {
                    setName(event.target.value);}}></input>
                    <input type="text" id="text" className="fadeIn second" value={work_time} placeholder="Work time" required onChange={(event) => {
                    setWorkTime(event.target.value);}}></input>
                    <input type="text" id="text" className="fadeIn third" value={worker} placeholder="Worker" required onChange={(event) => {
                    setWorker(event.target.value);}}></input>
                    <textarea className="form-control fadeIn third" value={description} title="Description" onChange={(event) => {setDescription(event.target.value);}}>                 
                    </textarea>
                    <div>
                        <input type="submit" className="fadeIn fourth btn btn-info btn-lg" onClick={newTask} value=" Add"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;


