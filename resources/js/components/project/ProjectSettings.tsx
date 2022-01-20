
import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProjectSettings() {
    let navigate = useNavigate();
    const params = useParams()
    interface IState {
        group: {
            group_name: string;
            id: number;
        }[]

        selected: {
            selected1: string;
            }[]

    }

    const [project_name, setName] = useState(params.project_name);
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");
    const [group, setListOfGroups] = useState<IState["group"]>([]);
    const [message, setMessage] = useState("");

    const options = group.map(d => ({
        "value" : d.group_name,
        "label" : d.group_name
    }))

    const [selectedOption, setSelectedOption] = useState([]);
    
    useEffect(()=>{
        axios.get(`/api/group-project/${params.id}`)
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setSelectedOption(response.data.group_list);
            setListOfGroups(response.data.group_list);
            console.log(response.data.group_list);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);

    const updateProject = () => {
        axios.put('/api/projects', {
            project_name: project_name,
            project_id: params.id,
            start_date: start_date,
            finish_date: finish_date,

        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/';
            }else{
                console.log("update project failed");
            }
        });
    }

    const deleteProject = () =>{
        axios.delete(`/api/projects/${params.id}`, {
        })
        .then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                navigate('/');
            }
        })
    }

    const changeHandler = (e:any) => {
        setSelectedOption(e ? e.map((x:any) => x.id) : []);
      };

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" placeholder="Project name" value={project_name} required onChange={(event) => {
                setName(event.target.value);}}></input>
                <input type="date" id="date1" className="fadeIn second" placeholder="start_date" title="start date" value={start_date} required onChange={(event) => {
                setStartDate(event.target.value);}}></input>
                <input type="date" id="date2" className="fadeIn third" placeholder="finish_date" title="finish date" value={finish_date} required onChange={(event) => {
                setFinishDate(event.target.value);}}></input>
                <div >
                    <Select 
                    isMulti
                    options={options}
                    onChange={changeHandler}
                    
                    />
                </div>

                <div className="marg-up">
                    <button className="fadeIn fourth btn btn-info" onClick={updateProject}> Update </button>  
                    <h3>{message}</h3>
                </div>

                <div className="marg-up-inp" >
                    <button className="fadeIn fourth btn btn-danger" onClick={deleteProject}> Delete </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectSettings;


