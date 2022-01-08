import './group.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';


function Worker() {

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState("");
    const location = useLocation()

    const update = () => {
    if(validateEmail(email) === false || validatePassword(password, password2) === false){
        setMessage("Wrong data inside input fields");
    }
    if(validateEmail(email) === true && validatePassword(password, password2) === true){
        axios.put('../api/workers', {
            id: location.state.id,
            username: username,
            surname: surname,
            email: email,
            number: number
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    window.location.href = '/workers';
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

    useEffect(()=>{
        setUsername(location.state.name);
        setSurname(location.state.surname);
        setEmail(location.state.email);
        setNumber(location.state.number);
        if(location.state.image === null){
            setImage("");
        }else{
            setImage(location.state.image);
        }
      }, []);


    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" value={username} placeholder="username" required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="text" id="surname" className="fadeIn first" value={surname} placeholder="surname" required onChange={(event) => {
                setSurname(event.target.value);}}></input>
                <input type="email" id="email" className="fadeIn second" value={email} placeholder="email" required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="text" id="number" className="fadeIn third" value={number} placeholder="number" required onChange={(event) => {
                setNumber(event.target.value);}}></input>
                <input type="text" id="image" className="fadeIn third" placeholder="profile image" required onChange={(event) => {
                setImage(event.target.value);}}></input>
                <div>
                    <input type="submit" className="fadeIn fifth btn btn-info btn-lg" onClick={update} value=" Add"></input>
                    <h3>{message}</h3>
                </div>
            </div>
        </div>
        
        
    );
}

export default Worker;
