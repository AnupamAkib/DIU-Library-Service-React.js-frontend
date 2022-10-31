import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Recover(props) {
    const navigate = useNavigate();
    let studentID = props.ID;
    let generated_OTP = props.OTP;
    const [OTP, setOTP] = useState("");
    const [errorMsg_OTP, setErrorMsg_OTP] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorMsg_Pass, setErrorMsg_Pass] = useState("");
    const [errorMsg_Pass_init, setErrorMsg_Pass_init] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    //console.log(generated_OTP);

    const methods = require('../methods.js');
    const api = methods.API();
    let toast = require('../toast.js');

    useEffect(() => {
        //console.log(OTP)
        if(OTP != generated_OTP && OTP.length){
            setErrorMsg_OTP("Invalid OTP");
        }
        else{
            setErrorMsg_OTP("");
        }
    }, [OTP])
    
    useEffect(() => {
        //console.log(password)
        if(password.length){
            if(password.length<6){
                setErrorMsg_Pass_init("Password is too short")
            }
            else{
                let lowerCaseFound = false;
                let upperCaseFound = false;
                let digitFound = false;
                for(let i=0; i<password.length; i++){
                    if(password[i]>='a' && password[i]<='z'){
                        lowerCaseFound = true;
                    }
                    else if(password[i]>='A' && password[i]<='Z'){
                        upperCaseFound = true;
                    }
                    else if(password[i]>='0' && password[i]<='9'){
                        digitFound = true;
                    }
                }
                if(lowerCaseFound && upperCaseFound && digitFound){
                    setErrorMsg_Pass_init("")
                }
                else{
                    setErrorMsg_Pass_init("Password should contain one uppercase (A-Z), one lowercase (a-z) and one digit (0-9)");
                }
                //setErrorMsg_Pass_init("")
            }
        }
        else{
            setErrorMsg_Pass_init("")
        }
    }, [rePassword, password])

    useEffect(() => {
        if(password.length && rePassword.length){
            if(rePassword == password){
                setErrorMsg_Pass("");
            }
            else{
                setErrorMsg_Pass("Password didn't match");
            }
        }
        else{
            setErrorMsg_Pass("");
        }
    }, [rePassword, password])


    const recoverPass = (e) =>{
        e.preventDefault();
        setBtnLoading(true);
        //console.log(studentID)
        //console.log(password)
        if(errorMsg_OTP=="" && OTP.length && errorMsg_Pass_init=="" && password.length && errorMsg_Pass=="" && rePassword.length){
            axios.post(api+'/student/changePassword', {
                //parameters
                studentID : studentID,
                newPassword : password
            })
                .then((response) => {
                    toast.msg("Password changed, please login", "green", 3000);
                    setBtnLoading(false);
                    navigate("/student/login");
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                    setBtnLoading(false);
            });
        }
        else{
            toast.msg("Sorry, something went wrong", "", 3000);
        }
    }

    return (
        <div>

            <form onSubmit={recoverPass}>
                <TextField onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                    }} type="number" value={OTP} onChange={(e)=>setOTP(e.target.value)} label="Enter OTP" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_OTP==""? false : true} helperText={errorMsg_OTP} required/><br/>
                <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Pass_init==""? false : true} helperText={errorMsg_Pass_init} required/><br/>
                <TextField type="password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)} label="Re-enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Pass==""? false : true} helperText={errorMsg_Pass} required/><br/>
                
                <Button disabled={(errorMsg_OTP=="" && OTP.length && errorMsg_Pass_init=="" && password.length && errorMsg_Pass=="" && rePassword.length)? btnLoading? true : false : true} type="submit" variant="contained" fullWidth>Change Password</Button>
            </form>
        
        </div>
    )
}
