import React from 'react'
import BookCard from './BookCard'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';

export default function StudentHomePage() {
  const navigate = useNavigate();
    const [allBooks, setAllBooks] = useState([]);
    const methods = require('../../methods.js');
    let toast = require('../../toast.js');
    const api = methods.API();
    
    methods.Student_verification();

    useEffect(()=>{
        if(localStorage.getItem("auth_studentID")=="" || localStorage.getItem("auth_studentID")==null){
            navigate("/student/login");
        }
    })
    
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        axios.get(api+'/library/allBooks', {
            //parameters
            //empID, password
        })
            .then((response) => {
                //response
                setAllBooks(response.data.result);
                setDataLoading(false);
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
    }, [])

    let bookCards = [];
    for(let i=0; i<allBooks.length; i++){
        bookCards.push(
            <BookCard 
              ID={allBooks[i]._id}
              title={allBooks[i].title}
              writer={allBooks[i].writer} 
              thumbnail={allBooks[i].book_thumbnail_link}
              bookLink={allBooks[i].book_link}
              addedDate={allBooks[i].added_date}
              tags={allBooks[i].tags}
              description={allBooks[i].description}
            />
        )
    }

    if(dataLoading){
        return <Loading/>
    }

    return (
        <div className='container'>
            <center>
                <h1>All Books</h1>
                <input type="search" style={{outline:"none", width:"90%", padding:"12px", fontSize:"large"}} placeholder="Search book, author, tags"/>
            </center>
            <br/>
            {bookCards}
        </div>
    )
}
