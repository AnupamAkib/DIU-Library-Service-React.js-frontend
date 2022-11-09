import { Button } from '@mui/material';
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function GuardCard(props) {
    const name = props.name;
    const password = props.password;
    const empID = props.empID;
    const guardID = props.ID;

    const [open_del, setOpen_del] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

    const handleClickOpen = () => {
        setOpen_del(true);
    };
    
    const handleClose_del = () => {
        setOpen_del(false);
    };

    const removeGuard = () =>{
        setBtnLoading(true);
        axios.post(`${api}/guards/deleteGuard`, {
            //parameters
            _id : guardID
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    toast.msg("Guard Removed Successfully", "green", 3000);
                    setBtnLoading(false);
                    setDeleted(true);
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
        handleClose_del();
    }

    return (
        <div className='guardCard' style={{display:deleted?"none":""}}>
            <b>Name: </b>{name}<br/>
            <b>Employee ID: </b>{empID}<br/>
            <b>Password: </b>{password}<br/>
            <Button align='right' variant='contained' color='error' style={{float:"right"}} onClick={handleClickOpen} disabled={btnLoading?true : false}>Remove</Button>


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
                        Security guard '{name}' will be removed as security guard. Are you sure?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose_del}>No</Button>
                    <Button onClick={removeGuard} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}
