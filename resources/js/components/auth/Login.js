import './auth.css';
import React, { useState } from "react";
import axios from "axios";



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.post('api/loginUser', {
            email: email,
            password: password
        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/';
            }else{
                console.log(response.data.message);
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
                <input type="submit" className="fadeIn third" value="Login" onClick={login}></input>
            </div>
        </div>
    );
}

export default Login;


