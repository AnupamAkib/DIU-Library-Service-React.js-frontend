import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function Student(props) {
    const id = props.id;
    const toast = require("../toast.js");
    const [studentName, setStudentName] = useState("");
    const [department, setDepartment] = useState("");
    const [degreeName, setDegreeName] = useState("");
    const [batch, setBatch] = useState("");
    const [shift, setShift] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const [found, setFound] = useState(false)
    const [lockerData, setLockerData] = useState([]);

    const methods = require("../methods.js");
    const api = methods.API();
    methods.Guard_verification();

    useEffect(() => {
        //axios.get(`http://software.diu.edu.bd:8189/result/studentInfo?studentId=${id}`, {
        axios.get(`/api/studentInfo?studentId=${id}`, {
            //parameters
        })
            .then((response) => {
                if(response.data.studentId != null){
                    setStudentName(response.data.studentName);
                    setDepartment(response.data.departmentName);
                    setDegreeName(response.data.progShortName);
                    setBatch(response.data.batchNo);
                    setShift(response.data.shift);
                    setFacultyName(response.data.facultyName);
                    setFound(true);
                    //console.log(response.data)
                }
                else{
                    if(id!="") toast.msg("Student not found", "red", 3000);
                    setFound(false)
                }
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                setFound(false)
            });
    }, [id])

    useEffect(() => {
        //search key history
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
                    setLockerData(data.result)
                }
                else{}
            }catch(err){
                console.log(err);
                toast.msg("Sorry, something went wrong", "red", 3000);
            }
        }
        fetchData();
    }, [id])

    //console.log(lockerData)
    let ar = [];
    const filterData = () =>{
        for(let i=0; i<lockerData.length; i++){
            if(lockerData[i].studentID == id){
                ar.push(
                    <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row" align="center">
                            <b>{lockerData[i].keyNumber}</b>
                        </StyledTableCell>
                        <StyledTableCell align="center">{lockerData[i].handoverTime}</StyledTableCell>
                        <StyledTableCell align="center">{lockerData[i].returnTime}</StyledTableCell>
                        <StyledTableCell align="center">{lockerData[i].duration}</StyledTableCell>
                    </StyledTableRow>
                )
            }
        }
        return ar.reverse();
    }

    if(found){
        return (
        <div style={{paddingTop:"30px"}}>
            <div style={{float:"left", marginBottom:"25px", background:"#f0f0f0", padding:"12px"}} className="col-4">
                <center>
                    <img src="/avatar.png" width="115"/>
                    <h2>{studentName}</h2>{department}<br/><br/>
                </center>
                <b>ID:</b> {id} <br/>
                <b>Department:</b> {department} <br/>
                <b>Program:</b> {degreeName} <br/>
                <b>Faculty:</b> {facultyName} <br/>
                <b>Batch:</b> {batch} <br/>
                <b>Shift:</b> {shift} <br/>
            </div>
            <div style={{float:"left", background:"#f0f0f0", paddingTop:"10px"}} className="col-8">
                <h3 align='center'>Previous History</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Key Number</StyledTableCell>
                                    <StyledTableCell align="center">Handover Time</StyledTableCell>
                                    <StyledTableCell align="center">Return Time</StyledTableCell>
                                    <StyledTableCell align="center">Duration</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterData()}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </div>
        )
    }
    else{
        return <div align='center' style={{background:"#f0f0f0", padding:"15px", marginTop:"10vh"}} className="container col-5"><h1 align='center'>Student Not Found</h1>Please check your student ID</div>
    }
}
