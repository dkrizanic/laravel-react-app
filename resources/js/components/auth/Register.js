
import './auth.css';
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        if(validate(email) === false){
            console.log("wrong data inside input fields");
        }
        if(validate(email) === true){
            axios.post('api/createUser', {
                username: username,
                email: email,
                password: password
                }).then((response) => {
                    if(response.data.status === 200){
                        console.log(response.data.message);
                    }else{
                        console.log("error");
                    }
                    window.location.href = '/';
                })
            }
          
        };
    
    const validate = (input) => {
        if (!input.includes("@"))
        {
            return false;
        }else{
            return true;
        }
    }    

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" name="login" placeholder="username" required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="email" id="email" className="fadeIn second" name="login" placeholder="email" required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <input type="submit" className="fadeIn fourth" value="Register" onClick={register}></input>
            </div>
        </div>
    );
}

export default Register;


