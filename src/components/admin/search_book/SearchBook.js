import React from 'react'
import SearchBookCard from './Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { Button } from '@mui/material';

export default function SearchBook() {
  const navigate = useNavigate();
    const [allBooks, setAllBooks] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [bookCards, setBookCards] = useState([]);
    const [searchedBook, setSearchedBook] = useState([]);

    const [pageStart, setPageStart] = useState(0);
    const [perPageBook, setPerPageBook] = useState(12);

    const [flag, setFlag] = useState(false);

    const methods = require('../../methods.js');
    let toast = require('../../toast.js');
    const api = methods.API();

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

    //let bookCards = [];


    useEffect(() => {
        setBookCards([]);
        setFlag(!flag);
        setPageStart(0);
        for(let i=0; i<allBooks.length; i++){
            let title = allBooks[i].title.toLowerCase();
            let writer = allBooks[i].writer.toLowerCase();
            let tag = allBooks[i].tags.toLowerCase();
            if(title.includes(searchKey.toLowerCase()) || writer.includes(searchKey.toLowerCase()) || tag.includes(searchKey.toLowerCase()) ){
                setBookCards(oldArray => [...oldArray, <SearchBookCard 
                    ID={allBooks[i]._id}
                    title={allBooks[i].title}
                    writer={allBooks[i].writer} 
                    thumbnail={allBooks[i].book_thumbnail_link}
                    bookLink={allBooks[i].book_link}
                    addedDate={allBooks[i].added_date}
                    tags={allBooks[i].tags}
                    description={allBooks[i].description}
                />]);
            }
            if(i<perPageBook && searchedBook.length==0){
                setSearchedBook(oldArray => [...oldArray, <SearchBookCard 
                    ID={allBooks[i]._id}
                    title={allBooks[i].title}
                    writer={allBooks[i].writer} 
                    thumbnail={allBooks[i].book_thumbnail_link}
                    bookLink={allBooks[i].book_link}
                    addedDate={allBooks[i].added_date}
                    tags={allBooks[i].tags}
                    description={allBooks[i].description}
                />]);
            }
        }
    }, [searchKey, dataLoading])
    
    useEffect(() => {
        setSearchedBook([]);
        for(let i=pageStart; i<Math.min(pageStart+perPageBook, bookCards.length); i++){
            setSearchedBook(oldArray => [...oldArray, bookCards[i]]);
        }
        //console.log(searchedBook)
    }, [pageStart, flag])
    
    
    const setPrevious = () =>{
        setPageStart(pageStart - perPageBook);
    }

    const setNext = () =>{
        setPageStart(pageStart + perPageBook);
    }

    useEffect(() => {
        console.log({pageStart})
    }, [pageStart])
    

    if(dataLoading){
        return <Loading/>
    }

    return (
        <div className='container'>
            <center>
                <h1>Select A Book to Edit</h1>
                <input onChange={(e)=>setSearchKey(e.target.value)} value={searchKey} type="search" style={{outline:"none", width:"90%", padding:"12px", fontSize:"large"}} placeholder="Search book, author, tags"/>
            </center>
            <br/>
            {searchedBook}
            <div style={{clear:"both"}}><br/><br/><br/><br/></div>
            <div style={{clear:"both"}} className="next_prev_btn">
                <center>
                    Book {pageStart+1} - {Math.min(pageStart+perPageBook, bookCards.length)} out of {bookCards.length}<br/>
                    <Button variant='contained' onClick={setPrevious} disabled={pageStart==0? true : false} style={{marginRight:"10px"}}><i className="fas fa-chevron-left" style={{fontSize:"large", marginRight:"10px"}}></i>Prev</Button>
                    <Button variant='contained' onClick={setNext} disabled={pageStart+perPageBook>=bookCards.length? true : false}>Next<i className="fas fa-chevron-right" style={{fontSize:"large", marginLeft:"10px"}}></i></Button>
                </center>
            </div>
        </div>
    )
}
