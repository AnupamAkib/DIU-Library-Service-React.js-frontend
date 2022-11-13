import React from 'react'
import Loading from '../../Loading.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Title from "../../Title"

export default function ActivityLog() {
    const navigate = useNavigate();
    const [activityAll, setActivityAll] = useState([])
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
                            if(access[k] == 8){ //8 = activity log
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





    const [loading, setloading] = useState(true)
    const [selectedRole, setSelectedRole] = useState("all")
    const [data, setData] = useState([])
    const [reload, setReload] = useState(false);


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        setActivityAll([]);
        axios.post(api+'/activity_log/read', {})
            .then((response) => {
                setData(response.data.result);
                setloading(false);
            }, (error) => {
                alert(error);
            });
    }, [reload])



    useEffect(() => {
        //console.log({selectedRole})
        function select(){
            setActivityAll([]); //empty
            if(selectedRole=='student'){
                for(let i=0; i<data.length; i++){
                    if(data[i].role=='student'){
                        setActivityAll((old)=>[...old, <ActivityCard activity={data[i].activity} role={data[i].role} username={data[i].username} dateTime={data[i].dateTime}/>]);
                    }
                }
            }
            if(selectedRole=='security guard'){
                for(let i=0; i<data.length; i++){
                    if(data[i].role=='security guard'){
                        setActivityAll((old)=>[...old, <ActivityCard activity={data[i].activity} role={data[i].role} username={data[i].username} dateTime={data[i].dateTime}/>]);
                    }
                }
            }
            if(selectedRole=='admin'){
                for(let i=0; i<data.length; i++){
                    if(data[i].role=='admin'){
                        setActivityAll((old)=>[...old, <ActivityCard activity={data[i].activity} role={data[i].role} username={data[i].username} dateTime={data[i].dateTime}/>]);
                    }
                }
            }
            if(selectedRole=='all'){
                for(let i=0; i<data.length; i++){
                    setActivityAll((old)=>[...old, <ActivityCard activity={data[i].activity} role={data[i].role} username={data[i].username} dateTime={data[i].dateTime}/>]);
                }
            }
        }
        select();
    }, [selectedRole, data])
    

    const deleteAllActivity = () =>{
        handleClose();
        //console.log("clear to request for deleting")
        axios.post(api+'/activity_log/delete', {})
            .then((response) => {
                setReload(!reload);
                methods.activity(`${localStorage.getItem("auth_adminName")} cleared all activity logs`, "admin", localStorage.getItem("auth_adminUsername"));
                toast.msg("Activity logs has been cleared", "green", 3000);
            }, (error) => {

            });
    }

    if(actionLoading){
        return <Loading/>
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div className='container col-6'>
            <Title title="Activity Logs"/>
            <center>
                <div className='col-4'>
                    <FormControl variant='filled' style={{padding:"5px"}} fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                    <Select
                        value={selectedRole}
                        label="Select Role"
                        onChange={(e)=>setSelectedRole(e.target.value)}
                        
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="security guard">Security Guard</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                    </FormControl>
                </div>
            </center>

            <br/><u><h2 align='center'>{activityAll.length} activities found</h2></u>

            {activityAll.reverse()}

            <div style={{position:"fixed", bottom:"15px", right:"15px"}} onClick={handleClickOpen}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab size="large" color="error" aria-label="delete">
                        <DeleteIcon />
                    </Fab>
                </Box>
            </div>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All the activity logs that were recorded till now will be deleted permanently. Do you want to continue?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteAllActivity} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
        </div>
    )
}
