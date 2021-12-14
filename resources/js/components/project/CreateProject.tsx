import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { Form } from "react-bootstrap";


function CreateProject() {

    interface IState {
        group: {
          group_name: string;
        }[]

        selected: {
            selected1: string;
          }[]

      }

    const [project_name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");
    const [group, setListOfGroups] = useState<IState["group"]>([]);
    const [message, setMessage] = useState("");
    const [selected, setSelectedOption] = useState<IState["selected"]>([]);

    const options = group.map(d => ({
        "value" : d.group_name,
        "label" : d.group_name
      }))

    const newProject = () => {
        if(project_name === ''){
            setMessage("Insert name");
        }else{
            axios.post('api/createProject', {
                project_name: project_name,
                start_date: start_date,
                finish_date: finish_date,
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    window.location.href = '/';
                }else{
                    console.log("create project failed");
                }
                
            });
        }
    }

    useEffect(()=>{
        axios.get("/api/groupList")
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setListOfGroups(response.data.group_list);
            console.log(response.data.message);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);



    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" placeholder="Project name" required onChange={(event) => {
                setName(event.target.value);}}></input>
                <input type="date" id="date1" className="fadeIn second" placeholder="start_date" title="start date" required onChange={(event) => {
                setStartDate(event.target.value);}}></input>
                <input type="date" id="date2" className="fadeIn third" placeholder="finish_date" title="finish date" required onChange={(event) => {
                setFinishDate(event.target.value);}}></input>
                <div>
                    <Select 
                    isMulti
                    options={options}
                    />
                </div>

                <div className="marg-up">
                    <button className="fadeIn fourth btn btn-info" onClick={newProject}> Add </button>  
                    <h3>{message}</h3>
                </div>
            </div>
        </div>
    );
}

export default CreateProject;

