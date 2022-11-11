import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import GuardCard from './GuardCard.js'
import Loading from '../../Loading.js'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'


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

export default function ManageGuards() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [guardsData, setGuardsData] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [empID, setEmpID] = useState("");
    const [reload, setReload] = useState(false);
    const [addBtnLoading, setAddBtnLoading] = useState(false);


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
                            if(access[k] == 5){
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



    const handleOpen = () => {
        setName("");
        setPassword("");
        setEmpID("");
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    

    const methods = require("../../methods.js");
    const toast = require("../../toast.js");
    const api = methods.API();

    useEffect(() => {
        axios.post(`${api}/guards/allGuardInfo`, {
            //parameters
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    setLoading(false);
                    setGuardsData(response.data.result);
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
    }, [reload])

    let guards = [];

    for(let i=0; i<guardsData.length; i++){
        guards.push(
            <GuardCard ID={guardsData[i]._id} name={guardsData[i].guardName} password={guardsData[i].password} empID = {guardsData[i].guardEmpID}/>
        )
    }

    const addGuard = (e) =>{
        e.preventDefault();
        //console.log({name, empID, password})
        setAddBtnLoading(true);

        axios.post(`${api}/guards/individualGuardInfo`, {
            //parameters
            guardEmpID: empID
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    //console.log(response.data.result)
                    toast.msg("Unsuccessful, guard already added", "", 3000);
                    setAddBtnLoading(false);
                }
                else{
                    axios.post(`${api}/guards/addGuard`, {
                        //parameters
                        guardName: name,
                        guardEmpID: empID,
                        password: password
                    })
                        .then((response1) => {
                            //console.log(response.data.status);
                            if(response1.data.status=="done"){
                                //console.log(response.data.result)
                                toast.msg("Security Guard Added successfully", "green", 3000);
                                setAddBtnLoading(false);
                                handleClose();
                                setReload(!reload);
                            }
                            else{
                                toast.msg("Sorry, something went wrong", "", 3000);
                            }
                        }, (error1) => {
                            console.log(error1); 
                            toast.msg("Sorry, something went wrong", "", 3000);
                    });
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
    }

    if(actionLoading){
        return <Loading/>
    }

    if(loading){
        return <Loading/>
    }
    

    return (
        <>
            <div className='container col-5'>
                <h1 align='center'>Security Guards</h1>
                {guards}
            </div>

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
                        <h2 align='center'>Add Guard</h2>
                        <form onSubmit={addGuard}>
                            <TextField value={name} onChange={(e)=>setName(e.target.value)} variant='filled' label="Enter Name" style={{marginBottom:"8px"}} fullWidth required/>
                            <TextField type='number' value={empID} onChange={(e)=>setEmpID(e.target.value)} variant='filled' label="Enter Employee ID" style={{marginBottom:"8px"}} fullWidth required/>
                            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} variant='filled' label="Set a password" style={{marginBottom:"8px"}} fullWidth required/>
                            <Button type='submit' variant='contained' fullWidth disabled={addBtnLoading? true : false}>Add guard</Button>
                        </form>
                    </Box>
                </Modal>

            </div>
        </>
    )
}
