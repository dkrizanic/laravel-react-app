import './group.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from 'react-router-dom';


function Workers() {

    const [workers, setListOfWorkers] = useState<IState["workers"]>([]);
    const [message, setMessage] = useState("");
    interface IState {
        workers: {
          name: string;
          surname: string;
          email: string;
          number: number;
          image: string;
        }[]
      }
      
    useEffect(()=>{
        axios.get("/api/workers")
        .then((response) =>{
        if(response.data.status === 200){
            console.log(response.data);
            setListOfWorkers(response.data.workers);
        }else{
            console.log(response.data.message);
            setMessage(response.data.message);
        }
        })
        
    }, []);


    return (
        <div className="data">
            {workers.map((value, key) => {
            return (
              <div className="jumbotron jumbotron-fluid con-size fadeIn first " key={key}>
                <div className="container">
                  <img src={value.image}></img>
                  <h1 className="display-12 "><Link to="/workers/worker" state={workers[key]}> {value.name} {value.surname}</Link></h1>
                </div>
              </div>
            );
            })}
        </div>
        
        
    );
}

export default Workers;
