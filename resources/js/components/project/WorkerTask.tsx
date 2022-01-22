
import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

function WorkerTask() {

    let navigate = useNavigate();
    const location = useLocation()
    const [name] = useState(location.state.task_name);
    const [description] = useState(location.state.description);

    const change_status = () =>{
        axios.put('/api/task-done-status', {
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

    const checker = () =>{
        let text = "Confirm that task is done";
        if (confirm(text) == true) {
            change_status();
        }
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" defaultValue={name} title="name"></input>
                <textarea rows={10} readOnly className="form-control" defaultValue={description} title="description"></textarea>
                <div className="marg-up ">
                    <button className=" btn btn-info" onClick={checker}> Done </button>  
                </div>
            </div>
        </div>
    );
}

export default WorkerTask;


