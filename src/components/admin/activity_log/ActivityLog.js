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

export default function ActivityLog() {
    const [activityAll, setActivityAll] = useState([])
    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

    const [loading, setloading] = useState(true)
    const [selectedRole, setSelectedRole] = useState("all")
    const [data, setData] = useState([])



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
    }, [])



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
        console.log("clear to request for deleting")
    }


    if(loading){
        return <Loading/>
    }
    return (
        <div className='container col-6'>
            <h1 align='center'>Activity Logs</h1>

            <center>
                <div className='col-4'>
                    <FormControl variant='filled' style={{padding:"5px"}} fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        value={selectedRole}
                        label="Age"
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

            {activityAll}

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
