import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

export default function DeleteBook(props) {
    const navigate = useNavigate();
    const ID = props.ID;
    const title = props.title;
    const writer = props.writer;

    
    const [btnLoading, setBtnLoading] = useState(false);
    const [password, setPassword] = useState("")
    

    const methods = require('../../methods.js');
    let toast = require('../../toast.js');
    const api = methods.API();

    const deleteBook = (e) =>{
        e.preventDefault();
        setBtnLoading(true);
        if(localStorage.getItem("auth_adminPassword") == md5(password)){
            axios.post(api+'/library/deleteBook', {
                //parameters
                _id : ID
            })
                .then((response) => {
                    //response
                    setBtnLoading(false);
                    toast.msg("Book Deletion Successful", "green", 3000);
                    navigate("/admin/search_book/");
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                });
        }
        else{
            toast.msg("Incorrect Admin Password", "red", 3000);
        }
    }
    return (
        <div>
            <h1 className='capitalize'>{title}</h1>
            by <b className='capitalize'>{writer}</b><hr/>
            Are you sure you want to delete the book? <font color='red'>The book will be deleted permanently</font> from the system. Enter your admin password below to delete the book.<br/>
            <form onSubmit={deleteBook}>
                <TextField type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Enter Admin Password" variant="filled" style={{marginTop:"8px", marginBottom:"8px"}} fullWidth required/><br/>
                <Button type="submit" color="error" variant='contained' fullWidth>Delete this book</Button>
            </form>
        </div>
    )
}
