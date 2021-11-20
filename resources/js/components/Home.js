import './app.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h2>Make new amazing project :) <Link to="/createProject" className="btn btn-info marg-left" >  +  </Link></h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h2>project </h2>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default Home;


