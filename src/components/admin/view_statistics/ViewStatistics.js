import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import StatisticsCard from './StatisticsCard';
import { Button } from '@mui/material';


export default function ViewStatistics() {
    const navigate = useNavigate();

    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

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
                            if(access[k] == 7){ // 7=view statistics
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

    if(actionLoading){
        return <Loading/>
    }

    return (
        <div className='container col-6'>
            <h1 align='center'>Statistical Report</h1>
            <StatisticsCard count={113} title="Total Books"/>
            <StatisticsCard count={67} title="Total User"/>
            <StatisticsCard count={54} title="Books viewed and read today"/>
            <StatisticsCard count={32} title="Locker Key distributed today"/>
            <StatisticsCard count={17} title="Locker Key returned today"/>
            <StatisticsCard count={9} title="Locker Key on service right now"/>

            <div style={{clear:"both"}}>
                <br/>
                <h2>Users Count</h2>
                <b>Software Engineering:</b> 7 users <br/>
                <b>Computer Science & Engineering:</b> 13 users<br/>
                <b>ITM:</b> 4 users<br/>
            </div>
            <br/>
            <Button onClick={()=>window.print()} variant='contained'>print</Button>
        </div>
    )
}
