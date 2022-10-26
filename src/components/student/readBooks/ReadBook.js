import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export default function ReadBook() {
    const {bookID} = useParams();
    const [bookDetails, setBookDetails] = useState({});

    const methods = require('../../methods.js');
    const api = methods.API();
    useEffect(() => {
        axios.post(api+'/library/searchIndividualBook', {
            //parameters
            _id : bookID
        })
            .then((response) => {
                setBookDetails(response.data.result[0]);
            }, (error) => {
                console.log(error);
            });
    }, [])
    //<iframe src={bookDetails.book_link} width="100%" height="700"></iframe>
    
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
    }
    
    function changePage(offSet){
        setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }
    
    function changePageBack(){
        changePage(-1)
    }

    function changePageNext(){
        changePage(+1)
    }

    return (
        <div className='container'>
            <div className='readBookHeader'>
                <table cellPadding={10}>
                    <tr>
                        <td><img src="/pdf_logo.png" width="60"/></td>
                        <td>
                            <h2>{bookDetails.title}</h2>
                            {bookDetails.writer}<br/>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div className="">
            <header className="App-header">
                <Document file={bookDetails.book_link} onLoadSuccess={onDocumentLoadSuccess}>
                <Page height="700" pageNumber={pageNumber} />
                </Document>
                <p> Page {pageNumber} of {numPages}</p>
                { pageNumber > 1 && 
                <button onClick={changePageBack}>Previous Page</button>
                }
                {
                pageNumber < numPages &&
                <button onClick={changePageNext}>Next Page</button>
                }
            </header>
            </div>


        </div>
    )
}
