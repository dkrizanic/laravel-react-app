import './group.css';
import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from 'react-router-dom';


function Worker() {

    const location = useLocation()
    const [username, setUsername] = useState(location.state.name);
    const [surname, setSurname] = useState(location.state.surname);
    const [email, setEmail] = useState(location.state.email);
    const [message, setMessage] = useState("");
    const [number, setNumber] = useState(location.state.number);
    let navigate = useNavigate();

    const update = () => {
    if(validateEmail(email) === false){
        setMessage("Wrong email adress");
    }
    if(validateEmail(email) === true){
        axios.put('../api/workers', {
            id: location.state.id,
            username: username,
            surname: surname,
            email: email,
            number: number,
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    navigate("/workers")
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

      const deleteWorker = () =>{
        axios.delete(`/api/worker/${location.state.id}`, {
        })
        .then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                navigate('/workers');
            }else{
                console.log("Worker not deleted");
            }
        })
    }

    const checker = () =>{
        let text = "Are you sure you want to delete everything?";
        if (confirm(text) == true) {
            deleteWorker();
        }
    }

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
                <div>
                    <input type="submit" className="fadeIn fifth btn btn-info btn-lg" onClick={update} value=" Update "></input>
                    <h3>{message}</h3>
                </div>
                <div>
                    <Link to={`/workers/worker/password-reset/${location.state.id}`} className="btn btn-primary fadeIn fifth" >  Password reset  </Link>
                </div>
                <div>
                    <input className="fadeIn fifth btn btn-danger" onClick={checker} value=" Delete worker "></input>
                </div>
            </div>
        </div>
        
        
    );
}

export default Worker;
