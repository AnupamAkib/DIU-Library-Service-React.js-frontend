import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../Loading';

export default function AddBook() {
    const navigate = useNavigate();

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
                            if(access[k] == 1){
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




    const [state_pdf, setState_pdf] = useState({
        selectedFile: "",
        responseArray: [],
    })

    const [state_img, setState_img] = useState({
        selectedFile: "",
        responseArray: [],
    })

    const [title, setTitle] = useState("");
    const [errorMsg_title, setErrorMsg_title] = useState("");
    
    const [writer, setWriter] = useState("");
    const [errorMsg_writer, setErrorMsg_writer] = useState("");

    const [description, setDescription] = useState("");
    const [errorMsg_description, setErrorMsg_description] = useState("");

    const [tags, setTags] = useState("");
    const [errorMsg_tags, setErrorMsg_tags] = useState("");

    const [pdfBookLink, setPdfBookLink] = useState("");
    const [bookThumbnailLink, setBookThumbnailLink] = useState("");

    const [btnLoading, setBtnLoading] = useState(false);

    const handleInputChange_pdf = (event) => {
        //console.log(event.target.files)
        setState_pdf({
          selectedFile: event.target.files,
          responseArray:[]
        });
    }

    const handleInputChange_img = (event) => {
        //console.log(event.target.files)
        setState_img({
          selectedFile: event.target.files,
          responseArray:[]
        });
    }

    useEffect(() => {
        if(pdfBookLink.length && bookThumbnailLink.length){
            //send add book request to server
            axios.post(api+'/library/addBook', {
                //parameters
                title:title,
                writer:writer,
                description:description,
                tags:tags,
                added_date:methods.getDate(),
                book_link:pdfBookLink,
                book_thumbnail_link:bookThumbnailLink
            })
                .then((response) => {
                    //console.log(response.data.status);
                    if(response.data.status=="done"){
                        toast.msg("Book successfully added", "green", 3000);
                        navigate("/admin/");
                    }
                    else{
                        toast.msg("Failed to add book", "green", 3000);
                    }
                    setBtnLoading(false);
                }, (error) => {
                    console.log(error); 
                    toast.msg("Sorry, something went wrong", "", 3000);
                    setBtnLoading(false);
            });
        }
    }, [pdfBookLink, bookThumbnailLink])
    

    const addBook = (e) =>{
        e.preventDefault();
        setBtnLoading(true);
        let url = "https://diulibrary.000webhostapp.com/file.php";

        //upload pdf book
        const pdfData = new FormData();
        for (let i = 0; i < state_pdf.selectedFile.length; i++) {
            pdfData.append("file[]", state_pdf.selectedFile[i]);
        }
        axios
          .post(url, pdfData, {
            // receive two parameter endpoint url ,form data
          })
          .then((res) => {
            // then print response status
            setState_pdf({ responseArray: res.data });
            //console.log(res.data[0]);
            setPdfBookLink(res.data[0].url);
          },error=>{
            alert(error);
          });


          //upload thumbnail
          const imgData = new FormData();
          for (let i = 0; i < state_img.selectedFile.length; i++) {
            imgData.append("file[]", state_img.selectedFile[i]);
          }
          axios
            .post(url, imgData, {
              // receive two parameter endpoint url ,form data
            })
            .then((res) => {
              // then print response status
              setState_img({ responseArray: res.data });
              //console.log(res.data[0]);
              setBookThumbnailLink(res.data[0].url);
            },error=>{
              alert(error);
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

    if(actionLoading){
        return <Loading/>
    }

    return (
        <div className='container col-5'>
            {btnLoading? <div className='book_adding_loading'><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><div className='container col-3'><div style={{background:"white", padding:"18px", margin:"15px", borderRadius:"10px"}}><center><b><CircularProgress /><br/>Adding Book...</b><br/>Please Wait, it may take few seconds.<br/>Do not refreash the page</center></div></div></div>
            :""}
            <div className='inputContainer'>
                <h1 align='center'>Add Book</h1>
                <form onSubmit={addBook}>
                    <div style={{float:"left"}} className="col-6">
                        <TextField value={title} onChange={(e)=>setTitle(e.target.value)} label="Enter Book Title" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_title==""? false : title.length<=70? false : true} helperText={errorMsg_title} required/><br/>
                        <TextField value={writer} onChange={(e)=>setWriter(e.target.value)} label="Enter Book Writer" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_writer==""? false : writer.length<=30? false : true} helperText={errorMsg_writer} required/><br/>
                        <TextField value={description} onChange={(e)=>setDescription(e.target.value)} label="Enter Book Description" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_description==""? false : description.length<=900? false : true} helperText={errorMsg_description} placeholder="Write details about the book" rows={2} maxRows={4} multiline required/><br/>
                        <TextField placeholder="CSE, SWE, IT, BBA" value={tags} onChange={(e)=>setTags(e.target.value)} label="Enter Tags (Seperate by comma (,))" variant="filled" style={{marginBottom:"8px"}} fullWidth error={errorMsg_tags==""? false : tags.length<=50? false : true} helperText={errorMsg_tags} required/><br/>
                    </div>
                    <div style={{float:"left"}} className='col-6 tmp' >
                        <h5 align='center'>Select Files</h5>
                        <div className='selectBG' style={{marginBottom:"15px"}}>
                            Select your PDF book (PDF only) *<br/>
                            <input onChange={handleInputChange_pdf} type="file" name="fileToUpload" accept="application/pdf" className="form-control" required/>
                        </div>
                        <div className='selectBG' style={{marginBottom:"15px"}}>
                            Select book thumbnail (image only) *<br/>
                            <input onChange={handleInputChange_img} type="file" name="fileToUpload" accept="image/png, image/gif, image/jpeg" className="form-control" required/>
                        </div>
                    </div>
                    
                    <Button size="large" type="submit" variant="contained" fullWidth disabled={(title.length<=70 && title!="" && writer.length<=30 && writer!="" && description.length<=900 && description!="" && tags.length<=50 && tags!="")? false : true}>ADD BOOK</Button>
                </form>
            </div>
        </div>
    )
}
