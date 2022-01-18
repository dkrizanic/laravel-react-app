import './app.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


function Home() {

  interface IState {
    project: {
      project_name: string;
      finish_date: Date;
      start_date: Date;
      status: number;
      id: number;
    }[]
  }

    const [project, setListOfProjects] = useState<IState["project"]>([]);

    useEffect(()=>{
      axios.get("/api/projects")
      .then((response) =>{
        if(response.data.status === 200){
          setListOfProjects(response.data.project_list);
          console.log(response.data.message);
        }else{
          console.log(response.data.message);
        }
      })
      
    }, []);

    return (
      <div className="data">
        <div className="jumbotron jumbotron-fluid con-size">
          <div className="container">
            <h1 className="display-12">Make new amazing project <Link to="/create-project" className="btn btn-info marg-left" >  +  </Link></h1>
          </div>
        </div>
        {project.map((value, key) => {
            return (
              <div className="jumbotron jumbotron-fluid con-size fadeIn first" key={key}>
                <div className="container">
                  <h1 className="display-12"><Link to="/project"  state={project[key]}> {value.project_name} </Link></h1>
                  <p className="lead"> {value.start_date} : {value.finish_date} </p>
                  
                  <Link to={`/projectSettings/${value.id}/${value.project_name}`}><i className="fas fa-cog"></i></Link>
                </div>
              </div>
            );
        })}
      </div>
    );
}

export default Home;


