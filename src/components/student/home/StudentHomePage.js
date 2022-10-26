import React from 'react'
import BookCard from './BookCard'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StudentHomePage() {
    const [allBooks, setAllBooks] = useState([]);
    const methods = require('../../methods.js');
    const api = methods.API();

    useEffect(() => {
      axios.get(api+'/library/allBooks', {
          //parameters
          //empID, password
      })
          .then((response) => {
              //response
              setAllBooks(response.data.result);
          }, (error) => {
              console.log(error);
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
    return (
      <div className='container'>
        {bookCards}
      </div>
    )
}
