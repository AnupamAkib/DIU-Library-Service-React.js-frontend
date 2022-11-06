import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Loading from '../../Loading.js';

export default function BookDetails() {
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("auth_studentID")=="" || localStorage.getItem("auth_studentID")==null){
            navigate("/student/login");
        }
    })

    const { bookID } = useParams();
    const [loading, setLoading] = useState(localStorage.getItem("ID")==""?true:false);

    const [_id, set_id] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [writer, setwriter] = useState("");
    const [thumbnail, setthumbnail] = useState("");
    const [bookLink, setbookLink] = useState("");
    const [tags, settags] = useState("");
    const [addedDate, setaddedDate] = useState("");
    
    const [bookListBtnLoading, setBookListBtnLoading] = useState(true)
    const [bookListFlag, setBookListFlag] = useState()

    useEffect(() => {
        set_id(localStorage.getItem("ID"));
        settitle(localStorage.getItem("title"));
        setdescription(localStorage.getItem("description"));
        setwriter(localStorage.getItem("writer"));
        settags(localStorage.getItem("tags"));
        setthumbnail(localStorage.getItem("thumbnail"));
        setbookLink(localStorage.getItem("bookLink"));
        setaddedDate(localStorage.getItem("addedDate"));
        localStorage.setItem("ID", "");
        //localStorage.clear();
    }, []);
    
    let toast = require('../../toast.js');

    const methods = require('../../methods.js');
    methods.Student_verification();
    const api = methods.API();
    useEffect(() => {
        axios.post(api+'/library/searchIndividualBook', {
            //parameters
            _id : bookID
        })
            .then((response) => {
                //response
                //console.log(response.data.result[0])
                set_id(response.data.result[0]._id);
                settitle(response.data.result[0].title);
                setdescription(response.data.result[0].description);
                setwriter(response.data.result[0].writer);
                settags(response.data.result[0].tags);
                setthumbnail(response.data.result[0].book_thumbnail_link);
                setbookLink(response.data.result[0].book_link);
                setaddedDate(response.data.result[0].added_date);
                setLoading(false);

                if(localStorage.getItem("auth_studentID") != ""){
                    axios.post(api+'/student/checkInBookList', {
                        //parameters
                        bookID : response.data.result[0]._id,
                        studentID : localStorage.getItem("auth_studentID") 
                    })
                        .then((response) => {
                            if(response.data.status == "not found"){
                                setBookListFlag(false);
                            }
                            else{
                                setBookListFlag(true);
                            }
                            setBookListBtnLoading(false);
                        }, (error) => {
                            console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                        });
                }
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
      }, [])
    
    

    const saveInBookList = () =>{
        //_id
        setBookListBtnLoading(true);
        
        axios.post(api+'/student/addInBookList', {
            //parameters
            bookID : _id,
            studentID : localStorage.getItem("auth_studentID") 
        })
            .then((response) => {
                toast.msg("Saved in your booklist", "green", 2500);
                setBookListFlag(true);
                setBookListBtnLoading(false);
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
    }

    const removeFromList = () =>{
        setBookListBtnLoading(true)
        axios.post(api+'/student/removeFromBookList', {
            //parameters
            bookID : _id,
            studentID : localStorage.getItem("auth_studentID") 
        })
            .then((response) => {
                toast.msg("Removed from booklist", "red", 2500);
                setBookListFlag(false);
                setBookListBtnLoading(false);
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
    }
    
    if(loading){
        return (
            <Loading/>
        )
    }
    return (
        <div className=''>
            <div className='bg-img' style={{
                backgroundImage: `url(${thumbnail})`, 
                width:"100%", 
                height:"50vh",
                backgroundRepeat:"no-repeat",
                backgroundSize: 'cover',
                marginTop:"-20px"
            }}>
            </div>

            <div className='container col-6'>
            <div className='detailsBook'>
            <h1 style={{color:"darkblue"}} className="capitalize"><b>{title}</b></h1>
            Written by<br/>
            <b><font size="4" className="capitalize">{writer}</font></b><hr/>
            <b>Book Description: </b>{description}<br/><br/>
            <b>Tags: </b>{tags}<br/>
            <b>Book Added: </b>{addedDate}<br/><br/>

            <div className='container col-6'>
                <Button onClick={()=>navigate("/book/read/"+_id)} variant="contained" fullWidth>Read book</Button>
                {
                    bookListBtnLoading? <Button varient="contained" fullWidth disabled>Wait</Button> : 
                    bookListFlag? <Button onClick={()=> removeFromList()} style={{background:"red", marginTop:"10px"}} variant="contained" fullWidth>REmove from book list</Button> : 
                    <Button onClick={()=> saveInBookList()} style={{background:"green", marginTop:"10px"}} variant="contained" fullWidth>save in my book list</Button>
                }
            </div>
            </div>
            
            </div>
        </div>
    )
}
