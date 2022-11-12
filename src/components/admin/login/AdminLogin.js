import React, {useState, useEffect} from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("auth_adminUsername")){
            navigate("/admin/")
        }
    }, [])
    
    
    const methods = require('../../methods.js');
    const api = methods.API();
    var md5 = require('md5');
    let toast = require('../../toast.js');

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [btnLoading, setBtnLoading] = useState(false)

    const checkLogin = (e) => {
        e.preventDefault();
        //console.log("here")
        //console.log({studentID, password})
        setBtnLoading(true);
        axios.post(api+'/admin/readAllAdmin', {
            //parameters
        })
            .then((response) => {
                if(response.data.status=="done"){
                    const data = response.data.result;
                    let found = false;
                    for(let i=0; i<data.length; i++){
                        if(data[i].username == username && data[i].password == password){
                            //console.log("logged in success");
                            localStorage.setItem("auth_adminUsername", username);
                            localStorage.setItem("auth_adminPassword", md5(password));
                            localStorage.setItem("auth_adminName", data[i].name);
                            localStorage.setItem("props", data[i].access);
                            methods.activity(`${localStorage.getItem("auth_adminName")} logged in to the system`, "admin", localStorage.getItem("auth_adminUsername"));
                            found=true;
                            break;
                        }
                    }
                    //console.log({found})
                    if(found){
                        toast.msg("Login Successful", "green", 3000);
                        navigate('/admin')
                    }
                    else{
                        toast.msg("Wrong username or Password", "red", 3000);
                    }
                    setBtnLoading(false);
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                    setBtnLoading(false);
                }
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                setBtnLoading(false);
        });
    }

    return (
        <div className='container col-4'>
            <div className='inputContainer'>
                <center>
                    <img src="/library_logo.png" width="200px"/><br/><br/>
                    <h1 align='center'>Admin Login</h1>
                    <div style={{padding:"15px"}}>Enter your admin username & password to enter as an admin</div>
                </center>
                <form onSubmit={checkLogin}>
                    <TextField value={username} onChange={(e)=>setUsername(e.target.value)} label="Enter Username" variant="filled" style={{marginBottom:"8px"}} fullWidth required/><br/>
                    <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth required/><br/>
                    <Button size="large" type="submit" variant="contained" fullWidth disabled={(username.length && password.length)? btnLoading? true : false : true}>Login</Button>
                </form>

            </div>
        </div>
    )
}
