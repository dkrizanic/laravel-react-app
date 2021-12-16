
import './user.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Link } from 'react-router-dom';

function GroupOperations() {

    interface IState {
        workers: {
            name: string;
        }[]
    }
    const [workers, setListOfWorkers] = useState<IState["workers"]>([]);
    const options = workers.map(d => ({
        "value" : d.  name,
        "label" : d.  name
    }))

    useEffect(()=>{
        axios.get("/api/groupWorkersList")
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setListOfWorkers(response.data.workers_list);
            console.log(response.data.message);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);

    const deleteGroup = () =>{
        axios.post('api/deleteUser')
        .then((response) => {
            if(response.data.status === 200){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
                localStorage.removeItem("status");
                console.log(response.data.message);
                window.location.href = '/';
            }
        })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className='marg-up-inp'>
                    <Select 
                    isMulti
                    options={options}
                    />
                </div>
                <div className="marg-up ">
                    <button className=" btn btn-info" > Save </button>  
                </div>
                <div>
                    <h3 className='marg-up'>Operations</h3>
                    <Link to="/changePassword" className="btn btn-info" > Update group name </Link>
                </div>
                <div className="marg-up-inp" >
                    <button className="btn btn-danger" onClick={deleteGroup}> Delete group </button>
                </div>
            </div>
        </div>
    );
}

export default GroupOperations;

