import React from 'react'
import ListCard from './ListCard'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function BookList() {
    const [bookListDetails, setBookListDetails] = useState([])
    const [_id, set_id] = useState("191-35-2640")
    
    const methods = require('../../methods.js');
    const api = methods.API();
    useEffect(() => {
        axios.post(api+'/student/viewBookList', {
            //parameters
            studentID : _id
        })
            .then((response) => {
                setBookListDetails(response.data.result)
            }, (error) => {
                console.log(error);
            });
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
                <h1>Book List</h1>
            </center>
            {booklist}
        </div>
    )
}
