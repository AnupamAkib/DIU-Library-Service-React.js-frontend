import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminCard(props) {
    const name = props.name;
    const username = props.username;
    const password = props.password;
    const access = props.access;
    const _id = props.id;

    const [open_del, setOpen_del] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [deleted, setdeleted] = useState(false)

    const handleClickOpen_del = () => {
        setOpen_del(true);
    };
    
    const handleClose_del = () => {
        setOpen_del(false);
    };

    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

    const removeAdmin = () =>{
        setBtnLoading(true);
        axios.post(`${api}/admin/deleteAdmin`, {
            //parameters
            _id:_id
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    setBtnLoading(false);
                    toast.msg("Admin Deleted Successfully", "green", 3000);
                    setdeleted(true);
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                    setBtnLoading(false);
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
        handleClose_del();
    }

    const access_string = ["", "Add Book", "Edit Book", "Delete Book", "View User", "Manage Guards", "Manage Admin", "View Statistics", "Activity Logs"]
    
    const [view_access, setView_access] = useState([]);
    let tmp = [];
    useEffect(() => {
        tmp = [];
        for(let i=0; i<access.length; i++){
            tmp.push(addStyle(access[i]));
        }
        setView_access(tmp);
    }, [])

    
    const addStyle = (n) =>{
        return (
            <div style={{fontSize:"11px", float:"left", color:"black", padding:"5px", background:"#dadada", margin:"3px", borderRadius:"8px"}}>{access_string[n]}</div>
        )
    }


    return (
        <div className="adminCard" style={{display:deleted?"none":""}}>
            <b>Name:</b> <font className='capitalize' color="#303030" style={{fontWeight:"bold", fontSize:"large"}}>{name}</font><br/>
            <b>Username:</b> {username}<br/>
            <b>Password:</b> {password}<br/>
            <table style={{marginBottom:"8px"}}>
                <tr>
                    <td style={{verticalAlign: "top"}}>
                        <b>Access: </b>
                    </td>
                    <td>
                        {view_access}
                    </td>
                </tr>
            </table>
            <Button variant="contained" style={{marginRight:"7px"}}>Edit Admin</Button>
            <Button variant="contained" color='error' onClick={handleClickOpen_del} disabled={btnLoading}>Delete</Button>


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
                        Admin '{name}' will be deleted as an admin. Are you sure you want to continue?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose_del}>No</Button>
                    <Button onClick={removeAdmin} autoFocus>
                        Yes
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}
