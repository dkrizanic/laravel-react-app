import './auth.css';
import React, { useState } from "react";
import axios from "axios";



function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {

    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" name="login" placeholder="username" required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn second" name="login" placeholder="password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <input type="submit" className="fadeIn third" value="Login" onClick={login}></input>
            </div>
        </div>
    );
}

export default Login;


