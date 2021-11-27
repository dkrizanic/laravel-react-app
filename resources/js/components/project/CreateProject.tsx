import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";



function CreateProject() {

    interface IState {
        group: {
          group_name: string;
        }[]
      }

    const [project_name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");
    const [group, setListOfGroups] = useState<IState["group"]>([]);
    const [message, setMessage] = useState("");
    const [group_name, setGroupName] = useState("");

    const newProject = () => {
        console.log(group_name);
        console.log("++++");
        if(project_name === ''){
            setMessage("Insert name");
        }else{
            axios.post('api/createProject', {
                project_name: project_name,
                start_date: start_date,
                finish_date: finish_date,
                group_name: group_name
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
                    <select value={group_name} onChange={(event) => {setGroupName(event.target.value);}}>
                        {group.map((option, key) => {
                            return(
                                <option key={key} value={option.group_name}>{option.group_name}</option>
                            );
                        })}
                    </select>
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


