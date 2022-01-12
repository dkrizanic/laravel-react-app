import './group.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function Groups() {

    const [group_name, setGroup] = useState("");
    const [group, setListOfGroups] = useState<IState["group"]>([]);


    interface IState {
        group: {
          group_name: string;
          id : number;
        }[]
      }

    const newGroup = () => {
        axios.post('api/new-group', {
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
    
    useEffect(()=>{
        axios.get("/api/group")
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
        <div className="data">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <input type="text" id="text" className="fadeIn first" placeholder="Group name" required onChange={(event) => {
                    setGroup(event.target.value);}}></input>
                    <div>
                        <input type="submit" className="fadeIn secund btn btn-info btn-lg" onClick={newGroup} value=" Add"></input>
                    </div>
                </div>
            </div>
            
            {group.map((value, key) => {
            return (
              <div className="jumbotron jumbotron-fluid con-size fadeIn second" key={key}>
                <div className="container">
                  <h1 className="display-12">
                    <Link to={`/groups/${value.id}/${value.group_name}`}>{value.group_name}</Link>
                  </h1>
                </div>
              </div>
            );
            })}
        </div>
        
        
    );
}

export default Groups;


