import React, {useState, useEffect} from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("auth_guardID", ""); //logout from guard role
        if(localStorage.getItem("auth_studentID")){
            navigate("/student/")
        }
    }, [])
    
    
    const methods = require('../../methods.js');
    const api = methods.API();
    var md5 = require('md5');
    let toast = require('../../toast.js');

    const [studentID, setStudentID] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg_Password, setErrorMsg_Password] = useState("");
    const [errorMsg_ID, setErrorMsg_ID] = useState("");

    const [btnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        //console.log(studentID);
        if(studentID.length){
            //a valid id contain 3 hiphens, first part is of length 3, 2nd part is of length 2, third is between 2 to 6
            let valid = true;
            let id = studentID.split('-');
            if(id.length==3){
                let semester = id[0];
                let dept = id[1];
                let roll = id[2];

                let year = parseInt("20"+semester[0]+semester[1]);
                const d = new Date();
                let current_year = d.getFullYear();
                
                let flag = true;
                for(let i=0; i<roll.length; i++){
                    if(parseInt(roll[i])>=0 && parseInt(roll[i])<=9){}
                    else flag = false;
                }
                if(flag && (roll.length >= 2 && roll.length <= 6) && dept.length==2 && year <= current_year && (semester[2]=="1" || semester[2]=="2" || semester[2]=="3")){
                    valid = true;
                }
                else valid = false;
            }
            else{
                valid = false;
            }
            
            if(!valid){
                setErrorMsg_ID("Invalid Student ID")
            }
            else{
                setErrorMsg_ID("")
            }
        }
        else{setErrorMsg_ID("");}
    }, [studentID])
    
    useEffect(() => {
        //console.log(password)
        if(password.length){
            if(password.length<6){
                setErrorMsg_Password("Password is too short");
            }
            else{
                setErrorMsg_Password("");
            }
        }
        else{
            setErrorMsg_Password("");
        }
    }, [password])


    const checkLogin = (e) => {
        e.preventDefault();
        //console.log("here")
        //console.log({studentID, password})
        setBtnLoading(true);
        axios.post(api+'/student/individualStudentInfo', {
            //parameters
            studentID : studentID
        })
            .then((response) => {
                if(response.data.status=="done"){
                    if(response.data.result[0].password==password){
                        toast.msg("Login successful", "green", 3000);
                        localStorage.setItem("auth_studentID", studentID);
                        localStorage.setItem("auth_studentName", response.data.result[0].studentName);
                        localStorage.setItem("auth_studentDept", response.data.result[0].programName);
                        localStorage.setItem("auth_password", md5(password));
                        setBtnLoading(false);
                        navigate("/student");
                    }
                    else{
                        toast.msg("Wrong Student ID or Password", "red", 3000);
                        setBtnLoading(false);
                    }
                }
                else{
                    toast.msg("Wrong Student ID or Password", "red", 3000);
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
                <h1 align='center'>Student Login</h1>
                <form onSubmit={checkLogin}>
                    <TextField value={studentID} onChange={(e)=>setStudentID(e.target.value)} label="Enter Student ID" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_ID==""? false : true} helperText={errorMsg_ID} required/><br/>
                    <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Password==""? false : true} helperText={errorMsg_Password} required/><br/>
                    <Button type="submit" variant="contained" fullWidth disabled={(errorMsg_ID=="" && studentID.length && errorMsg_Password=="" && password.length)? btnLoading? true : false : true}>Login</Button>
                </form>

                <center><div style={{padding:"8px"}}>OR</div></center>
                <Button onClick={()=>navigate("/student/registration")} variant="contained" style={{background:"green"}} fullWidth>register new account</Button>
                <br/><br/>
                <Button onClick={()=>navigate("/student/password_recovery")} variant="text" fullWidth>Forgot your password?</Button>
            </div>
        </div>
    )
}
