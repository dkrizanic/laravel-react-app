import './app.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Home() {

    const [listOfProjects, setListOfProjects] = useState([]);


    useEffect(()=>{
      axios.get("/api/projectList")
      .then((response) =>{
        if(response.data.status === 200){
          setListOfProjects(response.data.project_list);
          console.log(response.data.project_list);
          console.log("++++++++++++");
          console.log(listOfProjects);
        }else{
          console.log(response.data.message);
        }
      })
      
      
    }, []);

    return (
      <div className="data">
        {listOfProjects.map((value, key) => {
            return (
            <div className="jumbotron jumbotron-fluid con-size" key={key}>
              <div className="jumbotron jumbotron-fluid con-size">
              <div className="container">
                <h1 className="display-12">{value.project_name}</h1>
                <p className="lead"> test </p>
              </div>

              <Link to="/createProject" className="btn btn-info marg-left" >  +  </Link>
            </div>

              
            </div>
            );
        })}
      </div>
    );
}

export default Home;


