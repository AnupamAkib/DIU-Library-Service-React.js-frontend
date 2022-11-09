import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const api_link = "https://diu-library-service.onrender.com";


function Student_verification(){
    const navigate = useNavigate();
    const auth_studentID = localStorage.getItem("auth_studentID");
    const auth_password = localStorage.getItem("auth_password");
    if(auth_studentID=="" || auth_studentID==null){
        navigate("/student/login");
    } 
    //console.log(auth_password, auth_studentID)
    var md5 = require('md5');
    let toast = require('./toast.js');
    
    useEffect(() => {
        //console.log(auth_password)
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


function Guard_verification(){
    const navigate = useNavigate();
    const auth_guardID = localStorage.getItem("auth_guardID");
    const auth_guardPassword = localStorage.getItem("auth_guardPassword");
    if(auth_guardID=="" || auth_guardID==null){
        navigate("/guards/login");
    } 
    //console.log(auth_password, auth_studentID)
    var md5 = require('md5');
    let toast = require('./toast.js');
    
    useEffect(() => {
        axios.post(API()+'/guards/individualGuardInfo', {
            //parameters
            guardEmpID : auth_guardID
        })
            .then((response) => {
                if(response.data.status=="done"){
                    if(md5(response.data.result[0].password)==auth_guardPassword){
                        //localStorage.setItem("auth_studentID", auth_studentID);
                        //localStorage.setItem("auth_password", auth_password);
                    }
                    else{
                        //toast.msg("Please login", "red", 3000);
                        localStorage.setItem("auth_guardID", "");
                        localStorage.setItem("auth_guardPassword", "");
                        localStorage.setItem("auth_guardName", "");
                        navigate("/guards/login");
                    }
                }
                else{
                    //toast.msg("Please login", "red", 3000);
                    localStorage.setItem("auth_guardID", "");
                    localStorage.setItem("auth_guardPassword", "");
                    localStorage.setItem("auth_guardName", "");
                    navigate("/guards/login");
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

function getTime(){
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getDate(){
    const d = new Date();
    let day = d.getDate();
    if(day < 10) day = "0"+day;
    let month = d.getMonth();
    let year = d.getFullYear();
    return day+" "+getMonthName(month)+" "+year;
}

function getMonthName(n){
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    return months[n];
}

function getTimeMilliseconds(){
    const d = new Date();
    let time = d.getTime();
    return time.toString();
}

export {API, getRandomOTP, Student_verification, Guard_verification, getDate, getMonthName, getTime, getTimeMilliseconds};