import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const api_link = "https://diu-library-service.onrender.com";


function Student_verification(){
    const navigate = useNavigate();
    const auth_studentID = localStorage.getItem("auth_studentID");
    const auth_password = localStorage.getItem("auth_password");
    //console.log(auth_password, auth_studentID)
    var md5 = require('md5');
    let toast = require('./toast.js');
    
    useEffect(() => {
        axios.post(API()+'/student/individualStudentInfo', {
            //parameters
            studentID : auth_studentID
        })
            .then((response) => {
                if(response.data.status=="done"){
                    if(md5(response.data.result[0].password)==auth_password){
                        //localStorage.setItem("auth_studentID", auth_studentID);
                        //localStorage.setItem("auth_password", auth_password);
                    }
                    else{
                        //toast.msg("Please login", "red", 3000);
                        localStorage.setItem("auth_studentID", "");
                        localStorage.setItem("auth_password", "");
                        navigate("/student/login");
                    }
                }
                else{
                    //toast.msg("Please login", "red", 3000);
                    localStorage.setItem("auth_studentID", "");
                    localStorage.setItem("auth_password", "");
                    navigate("/student/login");
                }
            }, (error) => {
                console.log(error);
        });
    }, [])
    
}

function getRandomOTP(){
    const d = new Date();
    let time = d.getTime();
    let tmp = 0;
    let t = time;
    while(t != 0){ 
        tmp *= 10;
        tmp += (t%10);
        t = Math.floor(t/10);
    }
    time += tmp;
    time *= 977;
    time = Math.floor(time/9717);
    let otp = (time%999983).toString();
    while(otp.length < 6){
        otp += "7";
    }
    return otp;
}

function API(){
    return api_link;
}

export {API, getRandomOTP, Student_verification};