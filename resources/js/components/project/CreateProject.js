
import React, { useState } from "react";
import axios from "axios";



function CreateProject() {

    const [project_name, setName] = useState("");
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");

    const newProject = () => {
        axios.post('api/createProject', {
            project_name: project_name,
            start_date: start_date,
            finish_date: finish_date
        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/';
            }else{
                console.log("create project failed");
            }
            
        });
        
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" placeholder="Project name" required onChange={(event) => {
                setName(event.target.value);}}></input>
                <input type="date" id="date1" className="fadeIn second" placeholder="start_date" title="start date" required onChange={(event) => {
                setStartDate(event.target.value);}}></input>
                <input type="date" id="date2" className="fadeIn third" placeholder="finish_date" title="finish date" required onChange={(event) => {
                setFinishDate(event.target.value);}}></input>
                <input type="submit" className="fadeIn fourth" value="Add" onClick={newProject}></input>
            </div>
        </div>
    );
}

export default CreateProject;


