import React from 'react'
import { useState, useEffect } from 'react'
import InfoCard from './InfoCard.js';
import ViewTable from './ViewTable.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import axios from 'axios';
import Loading from '../Loading.js';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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

export default function AllLockerInfo() {
    const navigate = useNavigate();
    const [studentID, setStudentID] = useState("");
    const [errorMsg_ID, setErrorMsg_ID] = useState("");
    const [keyNumber, setKeyNumber] = useState("");

    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const [open_mark, setOpen_mark] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("auth_guardID")=="" || localStorage.getItem("auth_guardID")==null){
            navigate("/guards/login");
        }
    }, [])
    

    const handleOpen = () => {
        setStudentID("");
        setKeyNumber("");
        setOpen(true);
    }
    const handleOpen_mark = () => {
        setKeyNumber("");
        setOpen_mark(true);
    }
    const handleClose = () => setOpen(false);
    const handleClose_mark = () => setOpen_mark(false);

    const methods = require('../methods.js');
    let toast = require('../toast.js');
    const api = methods.API();

    const [allLockerInfo, setAllLockerInfo] = useState([]);

    useEffect(() => {
        setDataLoading(true);
        async function fetchData(){
            try{
                const res = await fetch(`${api}/guards/allLockerEntity`,
                    {
                        method: "POST",
                        headers: {
                            //body: JSON.stringify({})
                        }
                    }
                );
                const data = await res.json();
                //console.log(data);
                if(data.status == "done"){
                    let tmp = data.result;
                    tmp.reverse();
                    setAllLockerInfo(tmp);
                    setDataLoading(false);
                }
                else{
                    toast.msg("Sorry, something went wrong", "red", 3000);
                    setDataLoading(false);
                }
            }catch(err){
                console.log(err);
                toast.msg("Sorry, something went wrong", "red", 3000);
            }
        }
        fetchData();
    }, [loading])

    useEffect(() => {
        //console.log(studentID);
        if(studentID.length){
            //a valid id contain 3 hiphens, first part is of length 3, 2nd part is of length 2, third is between 2 to 6
            let valid = true;
            let id = studentID.split('-');
            if(id.length==3){
                let semester = id[0];
                let dept = id[1];
                let roll = id[2];

                let year = parseInt("20"+semester[0]+semester[1]);
                const d = new Date();
                let current_year = d.getFullYear();
                
                let flag = true;
                for(let i=0; i<roll.length; i++){
                    if(parseInt(roll[i])>=0 && parseInt(roll[i])<=9){}
                    else flag = false;
                }
                if(flag && (roll.length >= 2 && roll.length <= 6) && dept.length==2 && year <= current_year && (semester[2]=="1" || semester[2]=="2" || semester[2]=="3")){
                    valid = true;
                }
                else valid = false;
            }
            else{
                valid = false;
            }
            
            if(!valid){
                setErrorMsg_ID("Invalid Student ID")
            }
            else{
                setErrorMsg_ID("")
            }
        }
        else{setErrorMsg_ID("");}
    }, [studentID])
    

    /*useEffect(() => {
        console.log(methods.getDate())
        console.log(methods.getTime())
        console.log(methods.getTimeMilliseconds())
    }, [])*/
    

    const distrubuteLockerKey = async (e) =>{
        e.preventDefault();
        //console.log({studentID, keyNumber})

        let keyNotReturned = false;
        let keyAlreadyDistributed = false;
        for(let i=0; i<allLockerInfo.length; i++){
            if(allLockerInfo[i].studentID == studentID && allLockerInfo[i].duration == "-"){
                keyNotReturned = true;
            }
            if(allLockerInfo[i].keyNumber == keyNumber && allLockerInfo[i].duration == "-"){
                keyAlreadyDistributed = true;
            }
        }

        if(keyNotReturned){
            toast.msg(`Previous key was not returned by ${studentID}`, "red", 3500);
        }
        else if(keyAlreadyDistributed){
            toast.msg(`Sorry, key ${keyNumber} is already distributed, enter another key`, "red", 3500);
        }
        else{
            axios.post(api+'/guards/giveLockerKey', {
                //parameters
                studentID : studentID,
                keyNumber : keyNumber,
                handoverTime : methods.getDate()+", "+methods.getTime(),
                HT_milliseconds : methods.getTimeMilliseconds(),
                returnTime : "-",
                RT_milliseconds : "-"
            })
                .then((response) => {
                    if(response.data.status=="done"){
                        toast.msg(`Key ${keyNumber} is distributed to ${studentID}`, "green", 3200);
                        setLoading(!loading);
                        handleClose();
                    }
                    else{
                        toast.msg("Sorry, something went wrong", "", 3000);
                    }
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
        }
    }

    const markReturnKey = (e) =>{
        e.preventDefault();
        //console.log(keyNumber)
        let flag = false;
        for(let i=0; i<allLockerInfo.length; i++){
            if(allLockerInfo[i].keyNumber==keyNumber && allLockerInfo[i].duration=="-"){
                flag = true;
                axios.post(api+'/guards/markLockerKeyReturn', {
                    //parameters
                    keyNumber : keyNumber,
                    returnTime : methods.getDate()+", "+methods.getTime(),
                    RT_milliseconds : methods.getTimeMilliseconds()
                })
                    .then((response) => {
                        if(response.data.status=="done"){
                            toast.msg(`Key ${keyNumber} has been returned`, "green", 3200);
                            setLoading(!loading);
                            handleClose_mark();
                        }
                        else{
                            toast.msg("Sorry, something went wrong", "red", 3000);
                        }
                    }, (error) => {
                        console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                });
                break;
            }
        }
        if(!flag){
            toast.msg(`No distributed key found for key number ${keyNumber}`, "red", 3000);
        }
    }

    

  if(dataLoading){
    return <Loading/>
  }

    return (
        <div className='container'>
            <h1 align='center'>Locker Key History</h1>


            {allLockerInfo.length? 
            <ViewTable data = {allLockerInfo}/>
             : ""}


            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="col-3">
                        <h4 align='center'>Distribute New Key</h4><br/>
                        <form onSubmit={distrubuteLockerKey}>
                            <TextField value={studentID} onChange={(e)=>setStudentID(e.target.value)} label="Enter Student ID" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_ID==""? false : true} helperText={errorMsg_ID} required/><br/>
                            <TextField type="number" value={keyNumber} onChange={(e)=>setKeyNumber(e.target.value)} variant="filled" label="Enter Key Number" style={{marginBottom:"8px"}} required fullWidth/>
                            <Button type='submit' variant="contained" disabled={(studentID.length && errorMsg_ID=="" && keyNumber.length)? false : true} fullWidth>distribute</Button>
                        </form>
                    </Box>
                </Modal>
            </div>

            

            <div>
                <Modal
                    open={open_mark}
                    onClose={handleClose_mark}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="col-3">
                        <h4 align='center'>Mark Returned Key</h4><br/>
                        <form onSubmit={markReturnKey}>
                            <TextField type="number" value={keyNumber} onChange={(e)=>setKeyNumber(e.target.value)} variant="filled" label="Enter Key Number" style={{marginBottom:"8px"}} required fullWidth/>
                            <Button type='submit' variant="contained" disabled={(keyNumber.length)? false : true} fullWidth>mark as returned</Button>
                        </form>
                    </Box>
                </Modal>
            </div>
            

            
            <div style={{position:"fixed", bottom:"10px", right:"10px"}}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab size="large" color="secondary" aria-label="edit" onClick={handleOpen_mark}>
                        <EditIcon />
                    </Fab>
                    <Fab size="large" color="primary" aria-label="add" onClick={handleOpen}>
                        <AddIcon />
                    </Fab>
                </Box>
            </div>
        </div>
    )
}
