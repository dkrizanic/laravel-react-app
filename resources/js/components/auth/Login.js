import './auth.css';
import React, { useState } from "react";
import axios from "axios";



function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="email" id="email" className="fadeIn first" name="login" placeholder="email"></input>
                <input type="password" id="password" className="fadeIn second" name="login" placeholder="password"></input>
                <input type="submit" className="fadeIn third" value="Log In"></input>
            </div>
        </div>
    );
}

export default Login;


