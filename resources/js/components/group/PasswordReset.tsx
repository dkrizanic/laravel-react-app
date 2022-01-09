
import React, { useState} from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";

function PasswordReset() {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const params = useParams()
    const updatePassword = () =>{
        if(validatePassword(password, password2) === true){
            axios.put(`/api/reset-password/${params.id}`,{
                new_password: password2
            })
            .then((response) =>{
              if(response.data.status === 200){
                console.log(response.data.message);
                navigate('/workers');
              }else{
                setMessage(response.data.message);
              }
              
            });
        }else{
            setMessage("Password missmatch");
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
            <div id="formContent">
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

export default PasswordReset;


