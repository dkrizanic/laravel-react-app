import './auth.css';
import React, { useState } from "react";
import axios from "axios";



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const login = () => {
        axios.post('api/loginUser', {
            email: email,
            password: password
        }).then((response) => {
            if(response.data.status === 200){
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("username", response.data.username);
                console.log(response.data.message);
                window.location.href = '/';
            }else{
                setMessage(response.data.message)
            }
            
        });
        
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="email" id="email" className="fadeIn first" name="login" placeholder="email" required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn second" name="login" placeholder="password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <button className="fadeIn third btn btn-info" onClick={login}>Login</button>  
                <h3>{message}</h3>
            </div>
        </div>
    );
}

export default Login;


