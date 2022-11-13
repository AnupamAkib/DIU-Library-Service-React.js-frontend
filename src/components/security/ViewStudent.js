import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Student from './Student.js';


export default function ViewStudent() {
    const navigate = useNavigate();
    const methods = require("../methods.js");
    const toast = require("../toast.js");
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [studentID, setStudentID] = useState("");
    const [ID, setID] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [lockerData, setLockerData] = useState([])

    const searchStudent = (e) =>{
        e.preventDefault();
        setID(studentID);
    }

    useEffect(() => {
        if(localStorage.getItem("auth_guardID")=="" || localStorage.getItem("auth_guardID")==null){
            navigate("/guards/login");
        }
    }, [])

    return (
        <div className='container'>
            <h1 align="center">Search Student</h1>
            <div className='container col-5'>
                <form onSubmit={searchStudent}>
                    <input value={studentID} onChange={(e)=>setStudentID(e.target.value)} type="search" placeholder="Search Student ID" style={{width:"100%", padding:"10px", fontSize:"large", outline:"none"}}/>
                </form>
            </div>
            <Student id ={ID}/>
        </div>
    )
}
