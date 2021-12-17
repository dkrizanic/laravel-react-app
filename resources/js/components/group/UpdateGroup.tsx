import './group.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function UpdateGroups() {

    const [group_name, setGroup] = useState("");
    const [group, setListOfGroups] = useState<IState["group"]>([]);


    interface IState {
        group: {
          group_name: string;
          id : number;
        }[]
      }

    const newGroup = () => {
        axios.post('api/createGroup', {
            group_name: group_name,

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
        <div className="data">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <input type="text" id="text" className="fadeIn first" placeholder="Group name" required onChange={(event) => {
                    setGroup(event.target.value);}}></input>
                    <div>
                        <button className="btn btn-info fadeIn second" onClick={newGroup}> Add </button>  
                    </div>
                </div>
            </div>
        </div>
        
        
    );
}

export default UpdateGroups;


