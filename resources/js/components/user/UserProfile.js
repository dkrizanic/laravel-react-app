import './user.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function UserProfile() {

    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    const updateProfile = () =>{
        axios.post('api/updateProfile',{
            username: username,
            surname: surname,
            email: email
        })
        .then((response) =>{
            if(response.data.status === 200){
            console.log(response.data.message);
            window.location.href = '/';
            }else{
            console.log(response.data.message);
            }
            
        });
    }

    const deleteUser = () =>{
        console.log("deleted profile")
    }

    useEffect(()=>{
      axios.get("/api/userProfile")
      .then((response) =>{
        if(response.data.status === 200){
            setUsername(response.data.username);
            setSurname(response.data.surname);
            setEmail(response.data.email);
        }else{
            console.log(response.data.message);
        }
      })
    });

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="fadeIn first" name="login" value={username} required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="text" id="surname" className="fadeIn second" name="login" value={surname} required onChange={(event) => {
                setSurname(event.target.value);}}></input>
                <input type="email" id="email" className="fadeIn second" name="login" value={email} required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="submit" className="fadeIn third" onClick={updateProfile} value="Update"></input>
                <div className="fadeIn fourth">
                    <h3>Operations</h3>
                    <Link to="/changePassword" className="btn btn-info" >  Update password  </Link>
                </div>
                <div className="fadeIn fifth marg-up" >
                    <button className="btn btn-danger" onClick={deleteUser}> Delete profile </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;


