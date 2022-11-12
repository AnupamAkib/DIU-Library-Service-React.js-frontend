import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel} from '@mui/material'
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function AdminCard(props) {
    const navigate = useNavigate();
    const _name = props.name;
    const _username = props.username;
    const _password = props.password;
    const _access = props.access;
    const _id = props.id;
    
    const [editBtnLoading, seteditBtnLoading] = useState(false);
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
                    
                    if(localStorage.getItem("auth_adminUsername") == _username){
                        methods.activity(`${localStorage.getItem("auth_adminName")} deleted himself/herself as an admin`, "admin", localStorage.getItem("auth_adminUsername"))
                        localStorage.setItem("auth_adminUsername", "");
                        localStorage.setItem("auth_adminPassword", "");
                        localStorage.setItem("props", "");
                        toast.msg("You are no more admin", "red", 2500);
                        navigate("/admin/login")
                    }
                    else{
                        methods.activity(`${localStorage.getItem("auth_adminName")} deleted '${_name}' as an admin`, "admin", localStorage.getItem("auth_adminUsername"))
                    }
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

    const access_string = ["", "Add Book", "Edit Book", "Delete Book", "View User", "Manage Guards", "Manage Admin", "View Statistics", "Activity Logs", ""]
    

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setaddBookFlag(false);
        seteditBookFlag(false);
        setdeleteBookFlag(false);
        setviewUser(false);
        setmanageGuards(false);
        setmanageAdmin(false);
        setviewStatistics(false);
        setactivityLogs(false);
        setName("");
        setUsername("");
        setPassword("");
        setOpen(true);
        seteditClicked(!editClicked)
    }
    const handleClose = () => setOpen(false);

    const [addBookFlag, setaddBookFlag] = useState(false);
    const [editBookFlag, seteditBookFlag] = useState(false);
    const [deleteBookFlag, setdeleteBookFlag] = useState(false);
    const [viewUser, setviewUser] = useState(false);
    const [manageGuards, setmanageGuards] = useState(false);
    const [manageAdmin, setmanageAdmin] = useState(false);
    const [viewStatistics, setviewStatistics] = useState(false);
    const [activityLogs, setactivityLogs] = useState(false);

    const [name, setName] = useState(props.name);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);

    const [editClicked, seteditClicked] = useState(true);

    useEffect(() => {
        setName(_name);
        setUsername(_username);
        setPassword(_password);
        for(let i=0; i<_access.length; i++){
            if(_access[i]==1) setaddBookFlag(true);
            if(_access[i]==2) seteditBookFlag(true);
            if(_access[i]==3) setdeleteBookFlag(true);
            if(_access[i]==4) setviewUser(true);
            if(_access[i]==5) setmanageGuards(true);
            if(_access[i]==6) setmanageAdmin(true);
            if(_access[i]==7) setviewStatistics(true);
            if(_access[i]==8) setactivityLogs(true);
        }
    }, [editClicked])
    
    
    //console.log(access)

    const editAdmin = (e) =>{
        e.preventDefault();
        let tmp = [];
        if(addBookFlag){tmp.push(1);}
        if(editBookFlag){tmp.push(2);}
        if(deleteBookFlag){tmp.push(3);}
        if(viewUser){tmp.push(4);}
        if(manageGuards){tmp.push(5);}
        if(manageAdmin){tmp.push(6);}
        if(viewStatistics){tmp.push(7);}
        if(activityLogs){tmp.push(8);}
        //console.log({name, username, password, tmp})
        //clear to edit
        //editAdmin
        seteditBtnLoading(true);
        axios.post(`${api}/admin/editAdmin`, {
            //parameters
            _id : _id,
            name:name,
            password:password,
            access:tmp
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    seteditBtnLoading(false);
                    handleClose();
                    toast.msg("Admin Edited Successfully", "green", 3000);
                    methods.activity(`${localStorage.getItem("auth_adminName")} edited '${_name}'s admin information`, "admin", localStorage.getItem("auth_adminUsername"))
                    var md5 = require('md5');
                    if(localStorage.getItem("auth_adminUsername") == _username){
                        localStorage.setItem("auth_adminName", name);
                        localStorage.setItem("auth_adminPassword", md5(password));
                        localStorage.setItem("props", tmp);
                    }
                    navigate("/admin/redirect");
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                    seteditBtnLoading(false);
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
    }



    const [view_access, setView_access] = useState([]);
    let tmp = [];
    useEffect(() => {
        tmp = [];
        for(let i=0; i<_access.length; i++){
            tmp.push(addStyle(_access[i]));
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
            <b>Name:</b> <font className='capitalize' color="#303030" style={{fontWeight:"bold", fontSize:"large"}}>{_name}</font><br/>
            <b>Username:</b> {_username}<br/>
            <b>Password:</b> {_password}<br/>
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
            <Button variant="contained" style={{marginRight:"7px", width:"90px"}} onClick={handleOpen}>Edit</Button>
            <Button variant="contained" style={{width:"90px"}} color='error' onClick={handleClickOpen_del} disabled={btnLoading}>Delete</Button>


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



            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="col-3">
                        <h2 align='center'>Edit Admin</h2>
                        <form onSubmit={editAdmin}>
                            <TextField value={name} onChange={(e)=>setName(e.target.value)} variant='filled' label="Admin Name" style={{marginBottom:"8px"}} fullWidth required/>
                            <TextField title="You are not allowed to edit username" type='text' value={username} variant='filled' label="Username" style={{marginBottom:"8px"}}  InputProps={{ readOnly: true }} fullWidth required/>
                            <TextField type='text' value={password} onChange={(e)=>setPassword(e.target.value)} variant='filled' label="Password" style={{marginBottom:"8px"}} fullWidth required/>
                            <font><b>Edit Access:</b></font><br/>
                            <div style={{clear:"both", overflow:"hidden"}}>
                                <div style={{width:"50%", float:"left"}}>
                                    <FormControlLabel
                                        label={<font size="2">Add Book</font>}
                                        control={<Checkbox checked={addBookFlag} onChange={(e)=>setaddBookFlag(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">Edit Book</font>}
                                        control={<Checkbox checked={editBookFlag} onChange={(e)=>seteditBookFlag(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">Delete Book</font>}
                                        control={<Checkbox checked={deleteBookFlag} onChange={(e)=>setdeleteBookFlag(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">View User</font>}
                                        control={<Checkbox checked={viewUser} onChange={(e)=>setviewUser(e.target.checked)} />}
                                    />
                                </div>
                                <div style={{width:"50%", float:"left"}}>
                                    <FormControlLabel
                                        label={<font size="2">Manage Guards</font>}
                                        control={<Checkbox checked={manageGuards} onChange={(e)=>setmanageGuards(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">Manage Admin</font>}
                                        control={<Checkbox checked={manageAdmin} onChange={(e)=>setmanageAdmin(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">View Statistics</font>}
                                        control={<Checkbox checked={viewStatistics} onChange={(e)=>setviewStatistics(e.target.checked)} />}
                                    />
                                    <FormControlLabel
                                        label={<font size="2">Activity Logs</font>}
                                        control={<Checkbox checked={activityLogs} onChange={(e)=>setactivityLogs(e.target.checked)} />}
                                    />
                                </div>
                            </div>
                            <br/>
                            <Button type='submit' variant='contained' fullWidth disabled={
                                editBtnLoading? 
                                true 
                                : 
                                name.length && username.length && password.length && (addBookFlag || editBookFlag || deleteBookFlag || viewUser || manageGuards || manageAdmin || viewStatistics || activityLogs)?
                                false
                                :
                                true
                                }>Save changes</Button>
                        </form>
                    </Box>
                </Modal>

            </div>
        </div>
    )
}
