import './user.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function UserProfile() {


    const [username, setUsername] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [company, setCompany] = useState("");
    const [image, setImage] = useState("");
    const [authState, setAuthState] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setLoading] = useState(true);
    const CryptoJS = require("crypto-js");
    let navigate = useNavigate();

    const updateProfile = () =>{
        axios.put(`/api/user`,{
            username: username,
            surname: surname,
            email: email,
            number: number,
            company: company,
            image: image
        })
        .then((response) =>{
            if(response.data.status === 200){
                console.log(response.data.message);
                localStorage.removeItem("username");
                localStorage.setItem("username", username);
                navigate('/');
            }else{
                setMessage(response.data.message);
                console.log(response.data.message);
            }
        });
    }

    const deleteUser = () =>{
        axios.delete('api/user')
        .then((response) => {
            if(response.data.status === 200){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
                localStorage.removeItem("status");
                console.log(response.data.message);
                window.location.href = '/';
            }
        })
    }

    useEffect(()=>{
      axios.get("/api/user")
      .then((response) =>{
        if(response.data.status === 200){
            if(localStorage.getItem('status')){
                let bytes = CryptoJS.AES.decrypt(localStorage.getItem('status'), 'my-secret-key@123');
                let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if(decryptedData == 1){
                  setAuthState(true)
                }else{
                  setAuthState(false);
                }
              }
            setUsername(response.data.username);
            setSurname(response.data.surname);
            setEmail(response.data.email);
            setNumber(response.data.number);
            setCompany(response.data.company);
            setLoading(false);
            if(response.data.image === null){
                setImage("");
            }else{
                setImage(response.data.image);
            }
            console.log(response.data.message);
        }else{
            console.log(response.data.message);
        }
      })
    }, []);

    const checker = () =>{
        let text = "Are you sure you want to delete everything?";
        if (confirm(text) == true) {
            deleteUser();
        }
    }

    if (isLoading) {
        return <div className="App"></div>;
    }else{
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <input type="text" id="username" className="" value={username} title="number" required onChange={(event) => {
                    setUsername(event.target.value);}}></input>
                    <input type="text" id="surname" className="" value={surname} title="surname" required onChange={(event) => {
                    setSurname(event.target.value);}}></input>
                    <input type="email" id="email" className="" value={email} title="email" required onChange={(event) => {
                    setEmail(event.target.value);}}></input>
                    <input type="text" id="number" className="" value={number} title="phone number" required onChange={(event) => {
                    setNumber(event.target.value);}}></input>
                    {authState ? (
                        <>
                            <input type="text" id="company" className=""  value={company} title="company" required onChange={(event) => {
                            setCompany(event.target.value);}}></input>
                        </>
                      ) : (
                        <>
                            <input type="text" id="image" className="" value={image} title="image" placeholder='Profile image link' required onChange={(event) => {
                            setImage(event.target.value);}}></input>
                        </>
                    )}
                    <input type="submit" className="fadeIn fifth btn btn-info btn-lg" onClick={updateProfile} value="Update"></input>
                    <h3>{message}</h3>
                    <div className="fadeIn fifth">
                        <h3>Operations</h3>
                        <Link to="/user-profile/change-password" className="btn btn-info" >  Update password  </Link>
                    </div>
                    {authState ? (
                        <>
                            <div className="fadeIn fourth marg-up-inp" >
                                <button className="btn btn-danger" onClick={checker}> Delete everything </button>
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
   
}

export default UserProfile;


