import React from 'react'
import ListCard from './ListCard'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from '../../Loading'
import { useNavigate } from 'react-router-dom'
import Title from '../../Title'


export default function BookList() {
    const navigate = useNavigate();
    const [bookListDetails, setBookListDetails] = useState([])
    const [_id, set_id] = useState(localStorage.getItem("auth_studentID"));
    const [loading, setloading] = useState(true)
    
    const methods = require('../../methods.js');
    let toast = require('../../toast.js');

    methods.Student_verification();
    useEffect(()=>{
        if(localStorage.getItem("auth_studentID")=="" || localStorage.getItem("auth_studentID")==null){
            navigate("/student/login");
        }
    })

    const api = methods.API();
    useEffect(() => {
        if(_id != ""){
            axios.post(api+'/student/viewBookList', {
                //parameters
                studentID : _id
            })
                .then((response) => {
                    setBookListDetails(response.data.result)
                    setloading(false);
                }, (error) => {
                    console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
                });
        }
    }, [])

    let booklist = [];
    for(let i=0; i<bookListDetails.length; i++){
        booklist.push(
            <ListCard 
              ID={bookListDetails[i]._id}
              title={bookListDetails[i].title}
              writer={bookListDetails[i].writer} 
              thumbnail={bookListDetails[i].book_thumbnail_link}
              bookLink={bookListDetails[i].book_link}
              addedDate={bookListDetails[i].added_date}
              tags={bookListDetails[i].tags}
              description={bookListDetails[i].description}
            />
        );
    }

    if(loading){
        return <Loading/>
    }
    return (
        <><Title title="My Book List"/>
        <div className='container'>
            {
                booklist.length? booklist : 
                <center>
                    <br/><br/><br/><br/>
                    <i className='far fa-folder-open' style={{fontSize:"70px", opacity:"0.6", padding:"15px"}}></i>
                    <br/>
                    <h2>
                    Nothing in your Booklist
                    </h2>
                </center>
            }
        </div></>
    )
}
