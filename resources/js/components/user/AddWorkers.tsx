
import '../app.css';
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function AddWorkers() {

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [number, setNumber] = useState("");

    const add = () => {
        if(validateEmail(email) === false || validatePassword(password, password2) === false){
            setMessage("Wrong data inside input fields");
        }
        if(validateEmail(email) === true && validatePassword(password, password2) === true){
            axios.post('api/addWorker', {
                username: username,
                surname: surname,
                email: email,
                password: password,
                number: number
                }).then((response) => {
                    if(response.data.status === 200){
                        console.log(response.data.message);
                        window.location.href = '/addWorker';
                    }else{
                        setMessage(response.data.message);
                    }
                })
            }
        };
    
    const validateEmail = (input:String) => {
        if (!input.includes("@")){
            return false;
        }else{
            return true;
        }
    }    

    const validatePassword = (password:String, password2:String) => {
        if (password === password2){
            return true;
        }else{
            return false;
        }
    } 

    const makeGroup = () => {
        
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" name="login" placeholder="username" required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="text" id="surname" className="fadeIn first" name="login" placeholder="surname" required onChange={(event) => {
                setSurname(event.target.value);}}></input>
                <input type="email" id="email" className="fadeIn second" name="login" placeholder="email" required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="text" id="number" className="fadeIn third" name="login" placeholder="number" required onChange={(event) => {
                setNumber(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <input type="password" id="password2" className="fadeIn fourth" name="login" placeholder="repeted password" required onChange={(event) => {
                setPassword2(event.target.value);}}></input>
                <div>
                    <button className="fadeIn fifth btn btn-info" onClick={add}> Add </button>  
                    <h3>{message}</h3>
                </div>
                <div>
                    <Link to="/groups" className="btn btn-primary fadeIn fifth" >  Groups  </Link>
                </div>
                <div className="marg-up-inp">
                    <Link to="/listOfWorkers" className="btn btn-primary fadeIn fifth" >  List of Workers  </Link>
                </div>
            </div>
        </div>
    );
}

export default AddWorkers;


