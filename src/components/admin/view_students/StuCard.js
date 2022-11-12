import { Button } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function StuCard(props) {
    const navigate = useNavigate();

    const [btnLoading, setbtnLoading] = useState(false);
    const [open_del, setOpen_del] = useState(false);

    const methods = require('../../methods.js');
    const api = methods.API();
    let toast = require('../../toast.js');

    const name = props.name;
    const student_id = props.student_id;
    const _id = props.id;
    const email = props.email;
    const password = props.password;
    const department = props.department;
    const batch = props.batch;

    const handleClickOpen = () => {
        setOpen_del(true);
    };
    
    const handleClose_del = () => {
        setOpen_del(false);
    };

    const removeStudent = () =>{
        handleClose_del();
        setbtnLoading(true);
        axios.post(`${api}/student/deleteStudent`, {
            //parameters
            _id : _id
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    toast.msg("Student Deleted Successfully", "green", 3000);
                    setbtnLoading(false);
                    methods.activity(`${localStorage.getItem("auth_adminName")} deleted a student with ID ${student_id}`, "admin", localStorage.getItem("auth_adminUsername"));
                    navigate("/admin/view_users/redirect")
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                }
            }, (error1) => {
                console.log(error1); 
                toast.msg("Sorry, something went wrong", "", 3000);
            });
    }

    return (
        <div className='student_card'>
            <b>Name: </b>{name}<br/>
            <b>Student ID: </b>{student_id}<br/>
            <b>DIU Email: </b>{email}<br/>
            <b>Password: </b>{password}<br/>
            <b>Department: </b>{department}<br/>
            <b>Batch: </b>{batch}<br/>
            <Button variant='contained' color='error' onClick={handleClickOpen} disabled={btnLoading}>Delete</Button>


            <Dialog
                    open={open_del}
                    onClose={handleClose_del}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Student '{name}' will be deleted from the system. That will make the student unregistered. Are you sure?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose_del}>No</Button>
                    <Button onClick={removeStudent} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}
