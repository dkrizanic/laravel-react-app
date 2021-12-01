import './user.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function UserProfile() {


    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [company, setCompany] = useState("");
    const [authState, setAuthState] = useState(false);

    let history = useHistory();

    const updateProfile = () =>{
        axios.post('api/updateProfile',{
            username: username,
            surname: surname,
            email: email,
            number: number,
            company: company
        })
        .then((response) =>{
            if(response.data.status === 200){
                console.log(response.data.message);
                localStorage.removeItem("username");
                localStorage.setItem("username", username);
            }else{
            console.log(response.data.message);
            }
            history.push("/");
        });
    }

    const deleteUser = () =>{
        axios.post('api/deleteUser')
        .then((response) => {
            if(response.data.status === 200){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
                console.log(response.data.message);
                window.location.href = '/';
            }
        })
    }

    useEffect(()=>{
      axios.get("/api/userProfile")
      .then((response) =>{
        if(response.data.status === 200){
            setUsername(response.data.username);
            setSurname(response.data.surname);
            setEmail(response.data.email);
            setNumber(response.data.number);
            setCompany(response.data.company);
            if(response.data.user_status === 1){
                setAuthState(true);
            }
            console.log(response.data.message);
        }else{
            console.log(response.data.message);
        }
      })
    }, []);

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="username" className="" name="login" value={username} required onChange={(event) => {
                setUsername(event.target.value);}}></input>
                <input type="text" id="surname" className="" name="login" value={surname} required onChange={(event) => {
                setSurname(event.target.value);}}></input>
                <input type="email" id="email" className="" name="login" value={email} required onChange={(event) => {
                setEmail(event.target.value);}}></input>
                <input type="text" id="number" className="" name="login" value={number} required onChange={(event) => {
                setNumber(event.target.value);}}></input>
                {authState ? (
                    <>
                        <input type="text" id="company" className="" name="login" value={company} required onChange={(event) => {
                        setCompany(event.target.value);}}></input>
                    </>
                  ) : (
                    <>
                    </>
                )}
                <input type="submit" className="fadeIn fifth" onClick={updateProfile} value="Update"></input>
                <div className="fadeIn fifth">
                    <h3>Operations</h3>
                    <Link to="/changePassword" className="btn btn-info" >  Update password  </Link>
                </div>
                {authState ? (
                    <>
                        <div className="fadeIn fourth marg-up" >
                            <button className="btn btn-danger" onClick={deleteUser}> Delete everything </button>
                        </div>
                    </>
                  ) : (
                    <>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;


