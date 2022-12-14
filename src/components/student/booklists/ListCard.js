import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState } from 'react';

export default function ListCard(props) {
    let toast = require('../../toast.js');
    let navigate = useNavigate();

    const [Display, setDisplay] = useState("S");

    const ID = props.ID;
    const title = props.title;
    const description = props.description;
    const writer = props.writer;
    const thumbnail = props.thumbnail;
    const bookLink = props.bookLink;
    const tags = props.tags;
    const addedDate = props.addedDate;
    let cropedTitle="";

    for(let i=0; i<title.length; i++){
        cropedTitle += title[i];
        if(i===20){
            cropedTitle += "...";
            break;
        }
    }

    const sendBookData = () =>{
        localStorage.setItem("ID", ID);
        localStorage.setItem("title", title);
        localStorage.setItem("writer", writer);
        localStorage.setItem("description", description);
        localStorage.setItem("tags", tags);
        localStorage.setItem("thumbnail", thumbnail);
        localStorage.setItem("bookLink", bookLink);
        localStorage.setItem("addedDate", addedDate);
        methods.activity(`${localStorage.getItem("auth_studentName")} viewed book '${title.split(" ")[0]} ${title.split(" ")[1]}' from booklist`, "student", localStorage.getItem("auth_studentID"));
        navigate("/book/details/"+ID);
    }
    
    const methods = require('../../methods.js');
    const api = methods.API();
    const removeFromList = () =>{
        setDisplay("none");
        axios.post(api+'/student/removeFromBookList', {
            //parameters
            bookID : ID,
            studentID : localStorage.getItem("auth_studentID")
        })
            .then((response) => {
                toast.msg("Book removed from booklist", "red", 2500);
                methods.activity(`${localStorage.getItem("auth_studentName")} removed book '${title.split(" ")[0]} ${title.split(" ")[1]}' from booklist`, "student", localStorage.getItem("auth_studentID"));
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
        
    }

    return (
        <div className='bookView' title={title} style={{display:Display}}>
            <font className="bookList_cross" onClick={()=>removeFromList()}>
                <i class="fa fa-close"></i>
            </font>
            <Tooltip title={title+" by "+writer}>
            <Card style={{width:"100%"}} className="bookListCard" onClick={sendBookData}>
            <CardActionArea>
                <CardMedia
                component="img"
                height="120"
                image={thumbnail}
                alt={title}
                />
                <CardContent>
                <Typography>
                    <font style={{fontWeight:"bold"}} className="capitalize">{cropedTitle}</font>
                </Typography>
                <Typography variant="body2" color="text.secondary" className="capitalize">
                    {writer}
                </Typography>
                
                </CardContent>
            </CardActionArea>
            
            </Card>
            </Tooltip>
        </div>
    )
}
/*
<center>
                <Button color="error" variant="outlined"><i class="fa fa-trash" style={{marginRight:"7px"}}></i>remove</Button>
            </center>
*/