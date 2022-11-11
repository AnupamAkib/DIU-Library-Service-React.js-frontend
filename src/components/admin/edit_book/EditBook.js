import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom'

export default function EditBook() {
    const navigate = useNavigate();
    const {bookID} = useParams();
    
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
                            if(access[k] == 2){ //edit book = 2
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



    const [title, setTitle] = useState("");
    const [errorMsg_title, setErrorMsg_title] = useState("");
    
    const [writer, setWriter] = useState("");
    const [errorMsg_writer, setErrorMsg_writer] = useState("");

    const [description, setDescription] = useState("");
    const [errorMsg_description, setErrorMsg_description] = useState("");

    const [tags, setTags] = useState("");
    const [errorMsg_tags, setErrorMsg_tags] = useState("");

    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        setBtnLoading(true)
        axios.post(`${api}/library/searchIndividualBook`, {
            //parameters
            _id : bookID
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    console.log(response.data)
                    setTitle(response.data.result[0].title);
                    setWriter(response.data.result[0].writer);
                    setDescription(response.data.result[0].description);
                    setTags(response.data.result[0].tags);
                    setBtnLoading(false);
                }
                else{
                    toast.msg("Sorry, something went wrong", "", 3000);
                }
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
        });
    }, [])
    

    const editBook = (e) =>{
        e.preventDefault();
        setBtnLoading(true)
        axios.post(`${api}/library/editBook`, {
            //parameters
            _id : bookID,
            title:title,
            writer:writer,
            description:description,
            tags:tags
        })
            .then((response) => {
                //console.log(response.data.status);
                if(response.data.status=="done"){
                    toast.msg("Successfully Edited", "green", 3000);
                    navigate("/admin/search_book/edit")
                }
                else{
                    toast.msg("Unsuccessful", "", 3000);
                }
                setBtnLoading(false);
            }, (error) => {
                console.log(error); 
                toast.msg("Sorry, something went wrong", "", 3000);
                setBtnLoading(false);
        });
    }

    useEffect(() => {
        const maxLength = 70;
        if(title.length==0){
            setErrorMsg_title("");
        }
        else if(title.length <= maxLength){
            setErrorMsg_title(`${maxLength-title.length}/${maxLength} character${(maxLength-title.length)<=1?"":"s"} remaining`);
        }
        else{
            setErrorMsg_title(`Title is too long (max length ${maxLength})`)
        }
    }, [title])

    useEffect(() => {
        const maxLength = 30;
        if(writer.length==0){
            setErrorMsg_writer("");
        }
        else if(writer.length <= maxLength){
            setErrorMsg_writer(`${maxLength-writer.length}/${maxLength} character${(maxLength-writer.length)<=1?"":"s"} remaining`);
        }
        else{
            setErrorMsg_writer(`Writer Name is too long (max length ${maxLength})`)
        }
    }, [writer])
    
    useEffect(() => {
        const maxLength = 900;
        if(description.length==0){
            setErrorMsg_description("");
        }
        else if(description.length <= maxLength){
            setErrorMsg_description(`${maxLength-description.length}/${maxLength} character${(maxLength-description.length)<=1?"":"s"} remaining`);
        }
        else{
            setErrorMsg_description(`Description is too long (max length ${maxLength})`)
        }
    }, [description])


    useEffect(() => {
        const maxLength = 50;
        if(tags.length==0){
            setErrorMsg_tags("");
        }
        else if(tags.length <= maxLength){
            setErrorMsg_tags(`${maxLength-tags.length}/${maxLength} character${(maxLength-tags.length)<=1?"":"s"} remaining`);
        }
        else{
            setErrorMsg_tags(`Tag is too long (max length ${maxLength})`)
        }
    }, [tags])

    return (
        <div className='container col-5'>
            {btnLoading? <div className='book_adding_loading'><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><div className='container col-3'><div><center><CircularProgress style={{color:"skyblue"}} /><br/><font color="white">Please Wait</font></center></div></div></div>
            :""}
            <div className='inputContainer'>
                <h1 align='center'>Edit Book</h1>
                <center>You can't edit <b>PDF book</b> and <b>thumbnail</b>. For changing these, remove the book and re-add it</center>
                <br/>
                <form onSubmit={editBook}>
                    <div className="">
                        <TextField value={title} onChange={(e)=>setTitle(e.target.value)} label="Book Title" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_title==""? false : title.length<=70? false : true} helperText={errorMsg_title} required/><br/>
                        <TextField value={writer} onChange={(e)=>setWriter(e.target.value)} label="Book Writer" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_writer==""? false : writer.length<=30? false : true} helperText={errorMsg_writer} required/><br/>
                        <TextField value={description} onChange={(e)=>setDescription(e.target.value)} label="Book Description" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_description==""? false : description.length<=900? false : true} helperText={errorMsg_description} placeholder="Write details about the book" rows={2} maxRows={4} multiline required/><br/>
                        <TextField placeholder="CSE, SWE, IT, BBA" value={tags} onChange={(e)=>setTags(e.target.value)} label="Tags (Seperate by comma (,))" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_tags==""? false : tags.length<=50? false : true} helperText={errorMsg_tags} required/><br/>
                    </div>
                    <Button size="large" type="submit" variant="contained" fullWidth disabled={(title.length<=70 && title!="" && writer.length<=30 && writer!="" && description.length<=900 && description!="" && tags.length<=50 && tags!="")? false : true}>save changes</Button>
                </form>
            </div>
        </div>
    )
}
