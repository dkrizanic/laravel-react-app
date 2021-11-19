
import './auth.css';
import React, { useState } from "react";
import axios from "axios";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const register = () => {
        if(validateEmail(email) === false || validatePassword(password, password2) === false){
            console.log("wrong data inside input fields");
        }
        if(validateEmail(email) === true && validatePassword(password, password2) === true){
            axios.post('api/createUser', {
                username: username,
                email: email,
                password: password
                }).then((response) => {
                    if(response.data.status === 200){
                        localStorage.setItem("accessToken", response.data.token);
                        localStorage.setItem("username", response.data.username);
                        console.log(response.data.message);
                        window.location.href = '/';
                    }else{
                        console.log(response.data.message);
                    }
                })
            }
        };
    
    const validateEmail = (input) => {
        if (!input.includes("@")){
            return false;
        }else{
            return true;
        }
    }    

    const validatePassword = (password, password2) => {
        if (password === password2){
            return true;
        }else{
            return false;
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
                <input type="password" id="password2" className="fadeIn fourth" name="login" placeholder="repeted password" required onChange={(event) => {
                setPassword2(event.target.value);}}></input>
                <input type="submit" className="fadeIn fifth" value="Register" onClick={register}></input>
            </div>
        </div>
    );
}

export default Register;


