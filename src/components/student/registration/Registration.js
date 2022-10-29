import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import NextPhase from './NextPhase'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Registration() {

     useEffect(() => {
        //"http://software.diu.edu.bd:8189/result/studentInfo"
        //studentId=191-35-2640
        fetch('http://software.diu.edu.bd:8189/result/studentInfo?studentId=' + studentID)
            .then(response => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                alert(JSON.stringify(jsonData));
            })
            .catch((error) => {
                console.error(error)
                console.log("not found")
            })
    }, [])
    


    const navigate = useNavigate();
    const [studentID, setStudentID] = useState("191-35-2640");
    const [studentEmail, setStudentEmail] = useState("anupam35-2640@diu.edu.bd");
    const [studentName, setStudentName] = useState("");
    const [department, setDepartment] = useState("");
    const [degreeName, setDegreeName] = useState("");
    const [batch, setBatch] = useState("");
    const [OTP, setOTP] = useState("");

    const [errorMsg_ID, setErrorMsg_ID] = useState("");
    const [errorMsg_Email, setErrorMsg_Email] = useState("");

    const [idEmailProvided, setIdEmailProvided] = useState(false);
    const [nextBtnLoading, setNextBtnLoading] = useState(false);

    const [viewError, setviewError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("auth_studentID")){
            navigate("/student/")
        }
    }, [])

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
    }, [studentID, studentEmail])

    useEffect(() => {
        if(studentEmail.length){
            let valid = true;
            let email = studentEmail.split('@');
            if(email.length==2){
                if(email[1] == "diu.edu.bd"){
                    if(errorMsg_ID=="" && studentID.length){ //valid student ID found
                        let id = studentID.split('-');
                        if(email[0].includes(id[1]) && email[0].includes(id[2])){
                            valid = true;
                        }
                        else valid = false;
                    }
                }
                else valid = false;
            }
            else valid = false;
            if(!valid){
                setErrorMsg_Email("Incorrect Email")
            }
            else{
                setErrorMsg_Email("")
            }
        }
        else{
            setErrorMsg_Email("");
        }
    }, [studentEmail, studentID])

    const methods = require('../../methods.js');
    const api = methods.API();
    let toast = require('../../toast.js');

    const initialFormSubmit = (e) =>{
        e.preventDefault();
        let otp = methods.getRandomOTP();
        setOTP(otp);
        //console.log(studentID)
        //console.log(studentEmail)
        setNextBtnLoading(true);

        axios.post(api+'/student/individualStudentInfo', {
            //parameters
            studentID : studentID 
        })
            .then((response) => {
                //console.log(response.data);
                if(response.data.status=="done"){
                    toast.msg("Student already registered", "red", 3000);
                    setNextBtnLoading(false);
                }
                else{
                    //do register
                    axios.get("http://software.diu.edu.bd:8189/result/studentInfo", {
                        //parameters
                        params: {
                            studentId : studentID
                        }
                    })
                        .then((response) => {
                            setviewError(response.data.studentName);
                            setIdEmailProvided(true);
                            if(response.data.studentId != null){
                                setStudentName(response.data.studentName);
                                setDepartment(response.data.departmentName);
                                setDegreeName(response.data.progShortName);
                                setBatch(response.data.batchNo);
                                /*axios.post(api+'/system/send_mail', {
                                    //parameters
                                    sendTo: studentEmail,
                                    subject: "OTP for registration",
                                    emailBody: `
                                    <div style="background:#09509e; color:#fff; border:10px solid #39b24a;">
                                    <div style="background:#fff; padding:15px"><center><img src="https://library.daffodilvarsity.edu.bd/template/images/library_logo.png" width="280px"/></center></div>
                                    <div style="padding:15px; font-size:large" align="justify">
                                        Dear <b>${response.data.studentName}</b>, <br/>
                                        Welcome to DIU Library Service. Your registration process is going on and your One Time Password is '${otp}'. Please copy or remember the OTP and use it for completing the registration process. 
                                        <br/><br/><center><font size="6" style="background:darkgreen; padding:5px"><b>${otp}</b></font></center>
                                        <br/>
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
                                        setIdEmailProvided(true);
                                        setNextBtnLoading(false);
                                        toast.msg("OTP send to your email. Please check", "", 4000);
                                    }, (error) => {
                                        console.log(error);
                                        setviewError(error);
                                });*/
                                
                            }
                            else{
                                toast.msg("Student not found", "red", 3000);
                                setNextBtnLoading(false);
                            }
                        }, (error) => {
                            console.log(error);
                            alert(error)
                        });
                }
            }, (error) => {
                console.log(error);
                alert("error from individual student api")
            });
    }

    return (
        <div className='container col-4'>
            <div className='inputContainer'>
                <h1 align='center'>Student Registration</h1>
                {idEmailProvided?
                    <NextPhase id={studentID} email={studentEmail} name={studentName} department={department} degree={degreeName} batch={batch} otp={OTP}/>
                :
                    <>
                    <form onSubmit={initialFormSubmit}>
                        <TextField value={studentID} onChange={(e)=>setStudentID(e.target.value)} label="Enter Student ID" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_ID==""? false : true} helperText={errorMsg_ID} required/><br/>
                        <TextField value={studentEmail} onChange={(e)=>setStudentEmail(e.target.value)} label="Enter DIU Email" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_Email==""? false : true} helperText={errorMsg_Email} required/><br/>
                        <Button type="submit" variant="contained" fullWidth disabled={(studentID.length && studentEmail.length && errorMsg_ID=="" && errorMsg_Email=="")?  nextBtnLoading? true : false : true}>NEXT</Button>
                    </form><br/>
                    <Button size="small" onClick={()=>navigate("/student/login")} variant="text" fullWidth>Already registered? login here</Button>
                    </>
                }
                <br/>{viewError}
            </div>
        </div>
    )
}
