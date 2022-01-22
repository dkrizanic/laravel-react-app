import './project.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams,} from 'react-router-dom';
import Select from 'react-select';


function AddTask() {
    interface IState {
        workers: {
            name: string;
            surname: string;
            id: number;
        }[],

        selectedOption: {
            name: string;
            surname: string;
            id: number;
        }[],

    }
    let navigate = useNavigate();
    const params = useParams()
    const [name, setName] = useState("");
    const [work_time, setWorkTime] = useState("");
    const [description, setDescription] = useState("");
    const [worker, setWorker] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [workers, setListOfWorkers] = useState<IState["workers"]>([]);   
    const [selectedOption, setSelectedOption] = useState<string[]>([])

    const options = workers.map(d => ({
        "value" : d.name,
        "label" : d.name,
        "id" : d.id
    }))

    useEffect(()=>{
        axios.get(`/api/workers/${params.id}`)
        .then((response) =>{
        if(response.data.status === 200){
            setListOfWorkers(response.data.workers_list);
            console.log(response.data.workers_list);
        }else{
            console.log(response.data.message);
        }
        })
        
    }, []);

    const newTask = () => {
        if(name === '' || description === ''){

        }else{
            axios.post('/api/task', {
                id: params.id,
                name: name,
                work_time: work_time,
                description: description,
                workers: selectedOption
    
            }).then((response) => {
                if(response.data.status === 200){
                    console.log(response.data.message);
                    setName("");
                    setDescription("");
                    setWorkTime("");
                    setSuccess(true);
                    navigate(-1);
                }else{
                    console.log("create task failed");
                }
            });
        }
    }

    const changeHandler = (e:any) => {
        setSelectedOption(e ? e.map((x:any) => x.id) : []);
      };

    return (
        <div className="data">
            {success ? (
                    <>
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Task added</strong>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    </>
                  ) : (
                    <>
                    </>
                )}
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <input type="text" id="text" className="fadeIn first" value={name} placeholder="Task" required onChange={(event) => {
                    setName(event.target.value);}}></input>
                    <input type="text" id="text" className="fadeIn second" value={work_time} placeholder="Work time" required onChange={(event) => {
                    setWorkTime(event.target.value);}}></input>
                    <div className='marg-up-inp'>
                        <Select 
                        options={options}
                        onChange={changeHandler}
                        isMulti
                        />
                    </div>
                    <textarea className="form-control fadeIn third" value={description} title="Description" onChange={(event) => {setDescription(event.target.value);}}>                 
                    </textarea>
                    <div>
                        <input type="submit" className="fadeIn fourth btn btn-info btn-lg" onClick={newTask} value=" Add"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;


