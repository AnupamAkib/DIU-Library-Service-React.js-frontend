import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import AdminCard from './AdminCard.js'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Checkbox, FormControlLabel} from '@mui/material'
import Loading from '../../Loading.js'



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


export default function ManageAdmin() {
    const navigate = useNavigate();
    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminData, setAdminData] = useState([]);

    

    const fetchData = async () =>{
        setLoading(true)
        try{
            const res = await fetch(`${api}/admin/readAllAdmin`,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json;charset=UTF-8",
                        body: JSON.stringify({})
                    }
                }
            );
            const data = await res.json();
            setLoading(false);
            setAdminData(data.result);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [reload])

    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [access, setAccess] = useState([]);
    const [addBtnLoading, setAddBtnLoading] = useState(false);

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

    const addAdmin = (e) =>{
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
        console.log({name, username, password, tmp})

        var found = false;
        for(let i=0; i<adminData.length; i++){
            if(username == adminData[i].username){
                found=true; break;
            }
        }

        if(!found){
            setAddBtnLoading(true);
            axios.post(`${api}/admin/addAdmin`, {
                //parameters
                name:name,
                username:username,
                password:password,
                access:tmp
            })
                .then((response) => {
                    //console.log(response.data.status);
                    if(response.data.status=="done"){
                        //console.log(response.data.result)
                        setAddBtnLoading(false);
                        handleClose();
                        setReload(!reload);
                    }
                    else{
                        toast.msg("Sorry, something went wrong", "", 3000);
                        setAddBtnLoading(false);
                    }
                }, (error) => {
                    console.log(error); 
                    toast.msg("Sorry, something went wrong", "", 3000);
            });
        }
        else{
            toast.msg("Admin with this username already added", "red", 3000);
        }
    }


    let admins = [];

    for(let i=0; i<adminData.length; i++){
        admins.push(
            <AdminCard key={i} id={adminData[i]._id} name={adminData[i].name} username={adminData[i].username} password={adminData[i].password} access={adminData[i].access}/>
        )
    }


    if(loading){
        return <Loading/>
    }

    return (
        <div className='container col-5'>
            <h1 align='center'>Manage Admin</h1>
            {admins}



            <div style={{position:"fixed", bottom:"15px", right:"15px"}} onClick={handleOpen}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab size="large" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Box>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="col-3">
                        <h2 align='center'>Add Admin</h2>
                        <form onSubmit={addAdmin}>
                            <TextField value={name} onChange={(e)=>setName(e.target.value)} variant='filled' label="Enter Admin Name" style={{marginBottom:"8px"}} fullWidth required/>
                            <TextField type='text' value={username} onChange={(e)=>setUsername(e.target.value)} variant='filled' label="Create an username" style={{marginBottom:"8px"}} fullWidth required/>
                            <TextField type='text' value={password} onChange={(e)=>setPassword(e.target.value)} variant='filled' label="Create a password" style={{marginBottom:"8px"}} fullWidth required/>
                            <font><b>Select Access:</b></font><br/>
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
                                addBtnLoading? 
                                true 
                                : 
                                name.length && username.length && password.length && (addBookFlag || editBookFlag || deleteBookFlag || viewUser || manageGuards || manageAdmin || viewStatistics || activityLogs)?
                                false
                                :
                                true
                                }>Add admin</Button>
                        </form>
                    </Box>
                </Modal>

            </div>
        </div>
    )
}
