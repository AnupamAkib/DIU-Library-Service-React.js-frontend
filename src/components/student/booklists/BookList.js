import React from 'react'
import ListCard from './ListCard'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function BookList() {
    const [bookListDetails, setBookListDetails] = useState([])
    const [_id, set_id] = useState(localStorage.getItem("auth_studentID"));
    
    const methods = require('../../methods.js');
    methods.Student_verification();

    const api = methods.API();
    useEffect(() => {
        if(_id != ""){
            axios.post(api+'/student/viewBookList', {
                //parameters
                studentID : _id
            })
                .then((response) => {
                    setBookListDetails(response.data.result)
                }, (error) => {
                    console.log(error);
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
    return (
        <div className='container'>
            <center>
                <h1>My Book List</h1>
            </center>
            {
                booklist.length? booklist : 
                <center>
                    <br/><br/><br/><br/>
                    <div style={{
                        backgroundImage: `url('/booklist.png')`, 
                        height:"10vh",
                        width:"10vh",
                        backgroundRepeat:"no-repeat",
                        backgroundSize: 'cover'
                    }}>
                    </div><br/>
                    <h2>
                    Nothing in your Booklist
                    </h2>
                </center>
            }
        </div>
    )
}
