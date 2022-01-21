
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
    const [success, setSuccess] = useState(false);

    const add = () => {
        if(validateEmail(email) === false || validatePassword(password, password2) === false || password.length < 5 || number.length < 5){
            setMessage("Wrong data inside input fields");
            return 0;
        }
        if(validateEmail(email) === true && validatePassword(password, password2) === true){
            axios.post('api/new-worker', {
                username: username,
                surname: surname,
                email: email,
                password: password,
                number: number
                }).then((response) => {
                    if(response.data.status === 200){
                        console.log(response.data.message);
                        setUsername("");
                        setSurname("");
                        setEmail("");
                        setPassword("");
                        setPassword2("");
                        setNumber("");
                        setSuccess(true);
                    }else{
                        setMessage(response.data.message);
                    }
                })
            }
        };
    
    const validateEmail = (input:String) => {
        if (!input.includes("@") || input.length < 5){
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

    return (
        <div className="wrapper fadeInDown">
            {success ? (
                <>
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Worker added</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                </>
                ) : (
                <>
                </>
            )}
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" name="login" value={username} placeholder="username" required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="text" id="surname" className="fadeIn first" name="login" value={surname} placeholder="surname" required onChange={(event) => {
                setSurname(event.target.value);}}></input>
                <input type="email" id="email" className="fadeIn second" name="login" value={email} placeholder="email" required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="text" id="number" className="fadeIn third" name="login" value={number} placeholder="number" required onChange={(event) => {
                setNumber(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn third" name="login" value={password} placeholder="password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <input type="password" id="password2" className="fadeIn fourth" name="login" value={password2} placeholder="repeted password" required onChange={(event) => {
                setPassword2(event.target.value);}}></input>
                <div>
                    <input type="submit" className="fadeIn fifth btn btn-info btn-lg" onClick={add} value=" Add"></input>
                    <h3>{message}</h3>
                </div>
                <div>
                    <Link to="/groups" className="btn btn-primary fadeIn fifth" >  Groups  </Link>
                </div>
                <div className="marg-up-inp">
                    <Link to="/workers" className="btn btn-primary fadeIn fifth" >  List of Workers  </Link>
                </div>
            </div>
        </div>
    );
}

export default AddWorkers;


