
import React, { useState } from "react";
import axios from "axios";



function Groups() {

    const [group_name, setGroup] = useState("");

    const newGroup = () => {
        axios.post('api/createGroup', {
            group_name: group_name,

        }).then((response) => {
            if(response.data.status === 200){
                console.log(response.data.message);
                window.location.href = '/groups';
            }else{
                console.log("create project failed");
            }
            
        });
        
    }


    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <input type="text" id="text" className="fadeIn first" placeholder="Group name" required onChange={(event) => {
                setGroup(event.target.value);}}></input>
                <div>
                    <button className="fadeIn second btn btn-info" onClick={newGroup}> Add </button>  
                </div>
            </div>
        </div>
    );
}

export default Groups;


