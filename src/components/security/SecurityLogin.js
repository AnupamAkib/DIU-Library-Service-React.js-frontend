import React, {useState, useEffect} from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [employeeID, setEmployeeID] = useState("");
    const [password, setPassword] = useState("");
    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {

        localStorage.setItem("auth_studentID", ""); //logout from student role

        if(localStorage.getItem("auth_guardID")){
            navigate("/guards/all_distributed_key")
        }
    }, [])
    
    
    const methods = require('../methods.js');
    const api = methods.API();
    var md5 = require('md5');
    let toast = require('../toast.js');


    

    const checkSecurityGuardLogin = (e) => {
        e.preventDefault();
        setBtnLoading(true);
        axios.post(api+'/guards/individualGuardInfo', {
            //parameters
            guardEmpID : employeeID
        })
            .then((response) => {
                if(response.data.status=="done"){
                    if(response.data.result[0].password==password){
                        toast.msg("Login successful", "green", 3000);
                        localStorage.setItem("auth_guardID", employeeID);
                        localStorage.setItem("auth_guardName", response.data.result[0].guardName);
                        localStorage.setItem("auth_guardPassword", md5(password));
                        setBtnLoading(false);
                        navigate("/guards/all_distributed_key");
                    }
                    else{
                        toast.msg("Wrong Employee ID or Password", "red", 3000);
                        setBtnLoading(false);
                    }
                }
                else{
                    toast.msg("Wrong Employee ID or Password", "red", 3000);
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
                </center>
                <h1 align='center'>Security Guard Login</h1>
                <center>
                    Please enter your Employee ID and Password to enter the system as a library security guard
                    <br/><br/>
                </center>
                <form onSubmit={checkSecurityGuardLogin}>
                    <TextField value={employeeID} onChange={(e)=>setEmployeeID(e.target.value)} label="Enter Employee ID" variant="filled" style={{marginBottom:"8px"}} fullWidth required/><br/>
                    <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth required/><br/>
                    <Button type="submit" variant="contained" fullWidth disabled={(employeeID.length && password.length)? btnLoading? true : false : true}>Login</Button>
                </form>
            </div>
        </div>
    )
}
