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
            <h1 className="display-12">Make new amazing project <Link to="/createProject" className="btn btn-info marg-left" >  +  </Link></h1>
          </div>
        </div>
        {listOfProjects.map((value, key) => {
            return (
              <div className="jumbotron jumbotron-fluid con-size " key={key}>
                <div className="container">
                  <h1 className="display-12"><Link to="/taskList" > {value.project_name} </Link></h1>
                  <p className="lead"> {value.start_date} : {value.finish_date} </p>
                </div>
              </div>
            );
        })}
      </div>
    );
}

export default Home;


