import React from 'react'
import Card from './Card'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const navigate = useNavigate();


    const methods = require('../methods.js');
    const api = methods.API();
    let toast = require('../toast.js');

    const [action, setAction] = useState([])
    const [actionLoading, setActionLoading] = useState(true);

    useEffect(() => {
        setActionLoading(true);
        var md5 = require('md5');
        axios.post(api+'/admin/readAllAdmin', {
            //parameters
        })
            .then((response) => {
                //console.log(response.data)
                let data = response.data.result;
                let found = false;
                setAction([]);
                for(let i=0; i<data.length; i++){
                    if(data[i].username==localStorage.getItem("auth_adminUsername") && md5(data[i].password)==localStorage.getItem("auth_adminPassword")){
                        //console.log(data[i].access);
                        let access = data[i].access;
                        found = true;
                        for(let k=0; k<access.length; k++){
                            if(access[k]==1){
                                setAction(oldArray => [...oldArray, <Card href="/admin/add_book" icon="fas fa-book">Add Book</Card>]);
                            }
                            if(access[k]==2){
                                setAction(oldArray => [...oldArray, <Card href="/admin/search_book/edit" icon="fas fa-edit">Edit Book</Card>]);
                            }
                            if(access[k]==3){
                                setAction(oldArray => [...oldArray, <Card href="/admin/search_book/delete" icon="far fa-trash-alt">Delete Book</Card>]);
                            }
                            if(access[k]==4){
                                setAction(oldArray => [...oldArray, <Card href="/admin/view_users" icon="fas fa-users">View Users</Card>]);
                            }
                            if(access[k]==5){
                                setAction(oldArray => [...oldArray, <Card href="/admin/manage_guards" icon="fas fa-user-shield">Manage Guards</Card>]);
                            }
                            if(access[k]==6){
                                setAction(oldArray => [...oldArray, <Card href="/admin/manage_admin" icon="fas fa-user-tie">Manage Admin</Card>]);
                            }
                            if(access[k]==7){
                                setAction(oldArray => [...oldArray, <Card href="/admin/view_statistics" icon="fa fa-line-chart">View Statistics</Card>]);
                            }
                            if(access[k]==8){
                                setAction(oldArray => [...oldArray, <Card href="/admin/activity_logs" icon="fa fa-list-ul">Activity Logs</Card>]);
                            }
                        }
                        setActionLoading(false);
                        break;
                    }
                }
                //console.log({found})
                if(!found){toast.msg("You must login first", "red", 3000); navigate("/admin/login")}
            }, (error) => {
                alert(error);
            });
    }, [])
    


    return (
        <div className='container col-5'>
            <div align='center' style={{padding:"15px 20px 15px 20px"}}>
              <h1>Welcome Admin</h1>
              Click on the action that you want to perform. You have the access to perform the following actions.
            </div>
            {actionLoading? <Loading/> : action}
        </div>
    )
}
