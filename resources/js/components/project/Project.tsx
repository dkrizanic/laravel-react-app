
import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from 'react-router-dom';



function Project() {
    const location = useLocation()


    return (
        <div>
            <h1>{location.state.project_name}</h1>
        </div>
    );
}

export default Project;


