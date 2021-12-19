
import './group.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Link, useParams, useNavigate } from 'react-router-dom';

function GroupOperations() {

    interface IState {
        workers: {
            name: string;
        }[],

    }
    const params = useParams()
    const [workers, setListOfWorkers] = useState<IState["workers"]>([]);    
    const [group_name, setGroup] = useState("");
    const options = workers.map(d => ({
        "value" : d.  name,
        "label" : d.  name
    }))
    
    let navigate = useNavigate();
    
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
        axios.post('/api/deleteGroup', {
            group_id: params.id,
        })
        .then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                navigate('/groups');
            }
        })
    }

    const updateGroup = () => {
        axios.post('/api/updateGroup', {
            group_name: group_name,
            group_id: params.id

        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/groups';
            }else{
                console.log("create project failed");
            }
        });
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" placeholder={params.group_name} required onChange={(event) => {
                setGroup(event.target.value);}}></input>
                <div className='marg-up-inp'>
                    <Select 
                    isMulti
                    options={options}
                    />
                </div>
                <div className="marg-up ">
                    <button className=" btn btn-info" onClick={updateGroup}> Save </button>  
                </div>
                <div className="marg-up-inp" >
                    <button className="btn btn-danger" onClick={deleteGroup}> Delete group </button>
                </div>
            </div>
        </div>
    );
}

export default GroupOperations;


