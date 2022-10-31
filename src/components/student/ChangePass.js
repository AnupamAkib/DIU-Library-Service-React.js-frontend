import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ChangePass() {
    const navigate = useNavigate();
    const [curPass, setCurPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPassAgain, setNewPassAgain] = useState("");

    const [errorMsg_curPass, setErrorMsg_curPass] = useState("");
    const [errorMsg_newPass, setErrorMsg_newPass] = useState("");
    const [errorMsg_newPassAgain, setErrorMsg_newPassAgain] = useState("");

    const [btnLoading, setBtnLoading] = useState(false);
    
    const methods = require('../methods.js');
    methods.Student_verification();
    const api = methods.API();
    let toast = require('../toast.js');

    const changePass = (e) =>{
        e.preventDefault();
        setBtnLoading(true);
        if(errorMsg_curPass=="" && curPass.length && errorMsg_newPass=="" && newPass.length && errorMsg_newPassAgain=="" && newPassAgain.length){
            axios.post(api+'/student/changePassword', {
                //parameters
                studentID : localStorage.getItem("auth_studentID"),
                newPassword : newPass
            })
                .then((response) => {
                    toast.msg("Password changed successfully", "green", 3000);
                    localStorage.setItem("auth_password", md5(newPass));
                    setBtnLoading(false);
                    navigate("/student/");
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                    setBtnLoading(false);
            });
        }
        else{
            toast.msg("Sorry, something went wrong", "", 3000);
        }
    }

    let md5 = require('md5');

    useEffect(() => {
        //console.log(password)
        if(newPass.length){
            if(newPass.length<6){
                setErrorMsg_newPass("Password is too short");
            }
            else{
                let lowerCaseFound = false;
                let upperCaseFound = false;
                let digitFound = false;
                for(let i=0; i<newPass.length; i++){
                    if(newPass[i]>='a' && newPass[i]<='z'){
                        lowerCaseFound = true;
                    }
                    else if(newPass[i]>='A' && newPass[i]<='Z'){
                        upperCaseFound = true;
                    }
                    else if(newPass[i]>='0' && newPass[i]<='9'){
                        digitFound = true;
                    }
                }
                if(lowerCaseFound && upperCaseFound && digitFound){
                    setErrorMsg_newPass("")
                }
                else{
                    setErrorMsg_newPass("Password should contain one uppercase (A-Z), one lowercase (a-z) and one digit (0-9)");
                }
                //setErrorMsg_Pass_init("")
            }
        }
        else{
            setErrorMsg_newPass("")
        }
    }, [newPassAgain, newPass])

    useEffect(() => {
        if(newPass.length && newPassAgain.length){
            if(newPass == newPassAgain){
                setErrorMsg_newPassAgain("");
            }
            else{
                setErrorMsg_newPassAgain("Password didn't match");
            }
        }
        else{
            setErrorMsg_newPassAgain("");
        }
    }, [newPassAgain, newPass])

    useEffect(() => {
        if(curPass.length){
            if(md5(curPass) == localStorage.getItem("auth_password")){
                setErrorMsg_curPass("");
            }
            else{
                setErrorMsg_curPass("Incorrect password");
            }
        }
        else{
            setErrorMsg_curPass("");
        }
    }, [curPass])

    return (
        <div className='container col-4'>
            <div className='inputContainer'>
                <h1 align='center'>Change Password</h1>
                <form onSubmit={changePass}>
                    <TextField type="password" value={curPass} onChange={(e)=>setCurPass(e.target.value)} label="Enter Current Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_curPass==""? false : true} helperText={errorMsg_curPass} required/><br/>
                    <TextField type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} label="Enter New Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_newPass==""? false : true} helperText={errorMsg_newPass} required/><br/>
                    <TextField type="password" value={newPassAgain} onChange={(e)=>setNewPassAgain(e.target.value)} label="Re-enter New Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_newPassAgain==""? false : true} helperText={errorMsg_newPassAgain} required/><br/>
                    <Button type="submit" variant="contained" fullWidth disabled={(errorMsg_curPass=="" && curPass.length && errorMsg_newPass=="" && newPass.length && errorMsg_newPassAgain=="" && newPassAgain.length)? btnLoading? true : false : true}>Change password</Button>
                </form>
            </div>
        </div>
    )
}
