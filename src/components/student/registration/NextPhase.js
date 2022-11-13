import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NextPhase(props) {
    const navigate = useNavigate();
    let id = props.id;
    let email = props.email;
    let name = props.name;
    let department = props.department;
    let degree = props.degree;
    let batch = props.batch;
    let generated_otp = props.otp;

    const [OTP, setOTP] = useState("");
    const [errorMsg_OTP, setErrorMsg_OTP] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorMsg_Pass, setErrorMsg_Pass] = useState("");
    const [errorMsg_Pass_init, setErrorMsg_Pass_init] = useState("");
    const [registrationBtnLoading, setRegistrationBtnLoading] = useState(false)

    const methods = require('../../methods.js');
    const api = methods.API();
    let toast = require('../../toast.js');

    let md5 = require('md5');

    const doRegister = (e) =>{
        e.preventDefault();
        //console.log("clear to register");
        setRegistrationBtnLoading(true);
        if(errorMsg_OTP=="" && OTP.length && errorMsg_Pass_init=="" && password.length && errorMsg_Pass=="" && rePassword.length && generated_otp == OTP && password==rePassword){
            axios.post(api+'/student/registration', {
                //parameters
                studentID : id,
                studentName : name,
                DIUEmail : email,
                department : department,
                programName : degree,
                batch : batch,
                password : password,
                savedBooks : [] 
            })
                .then((response) => {
                    toast.msg("Registration successful", "green", 3000);
                    methods.activity(`${name} registered to the system`, "student", id);
                    localStorage.setItem("auth_studentID", id);
                    localStorage.setItem("auth_studentName", name);
                    localStorage.setItem("auth_password", md5(password));
                    localStorage.setItem("auth_studentDept", degree);
                    axios.post(api+'/system/send_mail', {
                        //parameters
                        sendTo: email,
                        subject: "Welcome to DIU Library Service",
                        emailBody: `
                        <div style="background:#09509e; color:#fff; border:10px solid #39b24a;">
                        <div style="background:#fff; padding:15px"><center><img src="https://library.daffodilvarsity.edu.bd/template/images/library_logo.png" width="280px"/></center></div>
                        <div style="padding:15px; font-size:large" align="justify">
                            Dear <b>${name}</b>, <br/>
                            Welcome to DIU Library Service. Your registration is successful. Search a book you want from our library, read it immediately or save it in your booklist for reading it later.<br/>
                            Happy Reading, Learning & Sharing!
                            <br/><br/>
                            Thanks,<br/>
                            DIU Library Service Team
                            <br/><hr/>
                            <font size="2">
                                For any kind of query, please contact with <a style="color:#fff" href="mailto:mirakib25@gmail.com">Mir Anupam Hossain Akib</a>
                            </font>
                        </div>
                    </div>`
                    })
                        .then((response) => {
                            
                        }, (error) => {
                            console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                    });
                    
                    setRegistrationBtnLoading(false);
                    navigate("/student");
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                    setRegistrationBtnLoading(false);
            });
        }
        else{
            toast.msg("Sorry, something went wrong", "", 3000);
        }
    }
    //console.log(generated_otp)
    useEffect(() => {
        //console.log(OTP)
        if(OTP != generated_otp && OTP.length){
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
    

    return (
        <form onSubmit={doRegister}>
            <div style={{padding:"8px", color:"red", fontSize:"small"}}>* Please do not refresh the page</div>
            <TextField value={id} label="Student ID" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            <TextField value={name} label="Student Name" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            <TextField value={email} label="Student Email" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            <TextField value={department} label="Department" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            <TextField value={degree} label="Program" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            <TextField value={batch} label="Batch" variant="filled" style={{marginBottom:"8px"}} fullWidth required inputProps={{ readOnly: true }}/><br/>
            
            <TextField onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
            }} type="number" value={OTP} onChange={(e)=>setOTP(e.target.value)} label="Enter OTP" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_OTP==""? false : true} helperText={errorMsg_OTP} required/><br/>
            
            <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Pass_init==""? false : true} helperText={errorMsg_Pass_init} required/><br/>
            <TextField type="password" value={rePassword} onChange={(e)=>setRePassword(e.target.value)} label="Re-enter Password" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Pass==""? false : true} helperText={errorMsg_Pass} required/><br/>
            
            <Button disabled={(errorMsg_OTP=="" && OTP.length && errorMsg_Pass_init=="" && password.length && errorMsg_Pass=="" && rePassword.length)? registrationBtnLoading? true : false : true} type="submit" variant="contained" fullWidth><i className="fas fa-user-check" style={{marginRight:"8px"}}></i>Register</Button>
        </form>
    )
}
