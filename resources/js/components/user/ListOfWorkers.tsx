import './user.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


function ListOfWorkers() {

    const [group_name, setGroup] = useState("");
    const [workers, setListOfWorkers] = useState<IState["workers"]>([]);
    interface IState {
        workers: {
          name: string;
          surname: string;
          email: string;
          number: number;
        }[]
      }
    useEffect(()=>{
        axios.get("/api/workersList")
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setListOfWorkers(response.data.workers);
            console.log(response.data.message);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);


    return (
        <div className="data">
            {workers.map((value, key) => {
            return (
              <div className="jumbotron jumbotron-fluid con-size fadeIn first" key={key}>
                <div className="container">
                  <h1 className="display-12"><Link to="/groupData" > {value.name} </Link></h1>
                </div>
              </div>
            );
            })}
        </div>
        
        
    );
}

export default ListOfWorkers;
