
import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ProjectSettings() {
    let navigate = useNavigate();
    const location = useLocation()
    interface IState {
        group: {
            group_name: string;
            id: number;
        }[]

        selectedOption: {
            group_name: string;
            id: number;
        }[]

    }

    const [project_name, setName] = useState(location.state.project_name);
    const [start_date, setStartDate] = useState(location.state.start_date);
    const [finish_date, setFinishDate] = useState(location.state.finish_date);
    const [group, setListOfGroups] = useState<IState["group"]>([]);

    const [message, setMessage] = useState("");

    const options = group.map(d => ({
        "value" : d.group_name,
        "label" : d.group_name,
        "id" : d.id
    }))

    const [selectedOption, setSelectedOption] = useState<IState["selectedOption"]>([]);

    const selectedOptions = selectedOption.map(d => ({
        "value" : d.group_name,
        "label" : d.group_name,
        "id" : d.id
    }))
    
    useEffect(()=>{
        axios.get(`/api/group-project/${location.state.id}`)
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setListOfGroups(response.data.available);   
            console.log(response.data.selected);
            console.log("available")
            console.log(response.data.available);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);

    const updateProject = () => {
        axios.put('/api/projects', {
            project_name: project_name,
            project_id: location.state.id,
            start_date: start_date,
            finish_date: finish_date,
            groups: selectedOption

        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/';
            }else{
                console.log(response.data.message);
            }
        });
    }

    const deleteProject = () =>{
        axios.delete(`/api/projects/${location.state.id}`, {
        })
        .then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                navigate('/');
            }
        })
    }

    const checker = () =>{
        let text = "Are you sure you want to delete project?";
        if (confirm(text) == true) {
            deleteProject();
        }
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
                    <button className="fadeIn fourth btn btn-danger" onClick={checker}> Delete </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectSettings;


