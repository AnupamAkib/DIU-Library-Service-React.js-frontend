import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import StuCard from './StuCard.js';
import Loading from '../../Loading.js';
import { useNavigate } from 'react-router-dom';

export default function ViewUsers() {
    const navigate = useNavigate();

    const [allData, setAllData] = useState([]);
    const [loading, setloading] = useState(true);

    const methods = require('../../methods.js');
    const api = methods.API();
    let toast = require('../../toast.js');


    const [actionLoading, setActionLoading] = useState(true);
    const verification = async () =>{
        var md5 = require('md5');
        axios.post(api+'/admin/readAllAdmin', {})
            .then((response) => {
                let data = response.data.result;
                let found = false;
                for(let i=0; i<data.length; i++){
                    if(data[i].username==localStorage.getItem("auth_adminUsername") && md5(data[i].password)==localStorage.getItem("auth_adminPassword")){
                        let access = data[i].access;
                        found = true;
                        let hasAccess = false;
                        for(let k=0; k<access.length; k++){
                            if(access[k] == 4){ //4 = view users
                                hasAccess = true; break;
                            }
                        }
                        if(!hasAccess){toast.msg("No Access!", "red", 3000); navigate("/admin/")}
                        setActionLoading(false);
                        break;
                    }
                }
                if(!found){toast.msg("You must login first", "red", 3000); navigate("/admin/login")}
            }, (error) => {
                alert(error);
            });
    }
    useEffect(() => {
        setActionLoading(true);
        verification();
    }, [])

    useEffect(() => {
      axios.post(`${api}/student/allStudentInfo`, {
        //parameters
      })
        .then((response) => {
            //console.log(response.data.status);
            if(response.data.status=="done"){
                //console.log(response.data.result)
                setAllData(response.data.result);
                setloading(false);
            }
            else{
                toast.msg("Sorry, something went wrong", "", 3000);
            }
        }, (error1) => {
            console.log(error1); 
            toast.msg("Sorry, something went wrong", "", 3000);
        });
    }, [])

    let allStudent=[];
    for(let i=0; i<allData.length; i++){
        allStudent.push(
            <StuCard id={allData[i]._id} name={allData[i].studentName} student_id={allData[i].studentID} email={allData[i].DIUEmail} password={allData[i].password} department={allData[i].department} batch={allData[i].batch}/>
        )
    }

    if(actionLoading){
        return <Loading/>
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div className='container col-5'>
            <h1 align='center'>All Registered Students</h1>
            <center><h3>{allStudent.length} students found</h3></center><br/>
            {allStudent}
        </div>
    )
}
