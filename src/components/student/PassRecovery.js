import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import Recover from './Recover.js'
import { useNavigate } from 'react-router-dom'

export default function PassRecovery() {
    const navigate = useNavigate();
    const [studentID, setStudentID] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorMsg_studentID, setErrorMsg_studentID] = useState("");

    const [OTPSend, setOTPSend] = useState(false);
    const [OTP, setOTP] = useState("")

    const methods = require('../methods.js');
    const api = methods.API();
    let toast = require('../toast.js');

    useEffect(() => {
        if(localStorage.getItem("auth_studentID")){
            navigate("/student/")
        }
    }, [])

    const sendOTP = (e) => {
        e.preventDefault();
        let otp = methods.getRandomOTP();
        setBtnLoading(true);
        axios.post(api+'/student/individualStudentInfo', {
            //parameters
            studentID : studentID 
        })
            .then((response) => {
                //console.log(response.data);
                if(response.data.status=="done"){
                    axios.post(api+'/system/send_mail', {
                        //parameters
                        sendTo: response.data.result[0].DIUEmail,
                        subject: "OTP for Password Recovery",
                        emailBody: `
                        <div style="background:#09509e; color:#fff; border:10px solid #39b24a;">
                        <div style="background:#fff; padding:15px"><center><img src="https://library.daffodilvarsity.edu.bd/template/images/library_logo.png" width="280px"/></center></div>
                        <div style="padding:15px; font-size:large" align="justify">
                            Dear <b>${response.data.result[0].studentName}</b>, <br/>
                            Your One Time Password for recovering your DIU Library Service's password is '${otp}'. Please copy or remember the OTP and use it for completing the password recovery process. 
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
                            setOTPSend(true);
                            setOTP(otp);
                            setBtnLoading(false);
                            toast.msg("OTP is sent to your email. Please check", "", 4000);
                        }, (error) => {
                            console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                            setBtnLoading(false);
                    });
                    //setOTPSend(true);
                    //setOTP(otp);
                }
                else{
                    //not found
                    toast.msg("Student isn't registered or not found", "red", 3000);
                    setBtnLoading(false);
                }
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
    }

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
                setErrorMsg_studentID("Invalid Student ID")
            }
            else{
                setErrorMsg_studentID("")
            }
        }
        else{setErrorMsg_studentID("");}
    }, [studentID])

    return (
            <div className='container col-4'>
                <div className='inputContainer'>
                    <h1 align='center'>Password Recovery</h1>
                    {
                        OTPSend?
                        <Recover ID={studentID} OTP={OTP}/> : 
                        <form onSubmit={sendOTP}>
                            <TextField value={studentID} onChange={(e)=>setStudentID(e.target.value)} label="Enter Student ID" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_studentID==""? false : true} helperText={errorMsg_studentID} required/><br/>
                            <Button type="submit" variant="contained" fullWidth disabled={(errorMsg_studentID=="" && studentID.length)? btnLoading? true : false : true}><i className="fas fa-arrow-right" style={{marginRight:"8px"}}></i>Next</Button>
                        </form>
                    }
                </div>
            </div>
    )
}
