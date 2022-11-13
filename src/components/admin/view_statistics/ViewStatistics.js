import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import StatisticsCard from './StatisticsCard';
import { Button } from '@mui/material';
import Title from "../../Title"

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

    const [allBookCount, setAllBookCount] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [bookViewedToday, setBookViewedToday] = useState(0);
    const [lockerKeyDistributedToday, setLockerKeyDistributedToday] = useState(0);
    const [lockerKeyReturnedToday, setLockerKeyReturnedToday] = useState(0);
    const [lockerKeyOnService, setLockerKeyOnService] = useState(0);
    const [userCountDept, setUserCountDept] = useState([]);


    useEffect(() => {
        axios.get(api+'/library/allBooks', {})
            .then((response) => {
                let data = response.data.result;
                setAllBookCount(data.length);
            }, (error) => {
                console.log(error)
        });

        axios.post(api+'/student/allStudentInfo', {})
            .then((response) => {
                let data = response.data.result;
                setTotalUser(data.length);
            }, (error) => {
                console.log(error)
        });

        axios.post(api+'/activity_log/read', {})
            .then((response) => {
                let data = response.data.result;
                const todaysDate = methods.getDate_short();
                let cnt = 0;
                for(let i=0; i<data.length; i++){
                    if(data[i].dateTime.split(", ")[0] == todaysDate && (data[i].activity.includes(" opened ") || data[i].activity.includes(" read ") || data[i].activity.includes(" viewed "))){
                        cnt++;
                    }
                }
                setBookViewedToday(cnt);
                //console.log(todaysDate)
            }, (error) => {
                console.log(error)
        });

        axios.post(api+'/guards/allLockerEntity', {})
            .then((response) => {
                let data = response.data.result;
                const todaysDate = methods.getDate();
                //console.log(data)
                let onService = 0;
                let distributedToday = 0;
                let returnedToday = 0;
                for(let i=0; i<data.length; i++){
                    let hot = data[i].handoverTime;
                    let rt = data[i].returnTime;
                    if(rt=='-'){
                        onService++;
                    }
                    else{
                        if(rt.split(", ")[0] == todaysDate){
                            returnedToday++;
                        }
                    }

                    if(hot.split(", ")[0] == todaysDate){
                        distributedToday++;
                    }
                }
                setLockerKeyDistributedToday(distributedToday);
                setLockerKeyReturnedToday(returnedToday);
                setLockerKeyOnService(onService);
            }, (error) => {
                console.log(error)
        });


        axios.post(api+'/student/allStudentInfo', {})
            .then((response) => {
                let data = response.data.result;
                //console.log(data)
                let dept = [];
                let freq = {};
                for(let i=0; i<data.length; i++){
                    let d = data[i].department;
                    freq[d] = (freq[d]==null? 0 : freq[d]) + 1;
                    if(freq[d] == 1){
                        dept.push(d);
                    }
                }
                //console.log(dept);
                setUserCountDept([]);
                for(let i=0; i<dept.length; i++){
                    setUserCountDept((old)=>[...old, 
                        <div>
                            <StatisticsCard count={freq[dept[i]]} title={dept[i]}/>
                        </div>
                    ])
                }
            }, (error) => {
                console.log(error)
        });

    }, [])
    

    if(actionLoading){
        return <Loading/>
    }

    return (
        <div className='container col-6'>
            <Title title="Statistical Report"/>
            <StatisticsCard count={allBookCount} title="Total Books"/>
            <StatisticsCard count={totalUser} title="Total User"/>
            <StatisticsCard count={bookViewedToday} title="Books viewed or read today"/>
            <StatisticsCard count={lockerKeyDistributedToday} title="Locker Key distributed today"/>
            <StatisticsCard count={lockerKeyReturnedToday} title="Locker Key returned today"/>
            <StatisticsCard count={lockerKeyOnService} title="Locker Key on service right now"/>

            <div style={{clear:"both"}}>
                <br/>
                <h2>Departmental Users Count</h2>
                {userCountDept}
                <div style={{clear:"both"}}>
                    <br/>
                    <Button onClick={()=>window.print()} variant='contained'><i className="fas fa-print" style={{marginRight:"8px"}}></i>print report</Button>
                </div>
            </div>
        </div>
    )
}
