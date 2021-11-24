
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function ChangePassword() {

    const [old_password, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");

    const updatePassword = () =>{
        if(validatePassword(password, password2) === true){
            axios.post('api/changePassword',{
                old_password: old_password,
                new_password: password2
            })
            .then((response) =>{
              if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/';
              }else{
                setMessage(response.data.message);
              }
              
            });
        }else{
            setMessage("Password missmatch");
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
                <input type="text" id="old_password" className="fadeIn first" placeholder="Old password" required onChange={(event) => {
                setOldPassword(event.target.value);}}></input>
                <input type="password" id="password" className="fadeIn second" placeholder="New password" required onChange={(event) => {
                setPassword(event.target.value);}}></input>
                <input type="password" id="password2" className="fadeIn second" placeholder="Repeted new password" required onChange={(event) => {
                setPassword2(event.target.value);}}></input>
                <button className="fadeIn third btn btn-info" onClick={updatePassword}>Update</button>  
                <h3>{message}</h3>
            </div>
        </div>
    );
}

export default ChangePassword;


