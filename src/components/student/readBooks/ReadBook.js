import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadPDF from './LoadPDF.js';
import Loading from '../../Loading.js';
import { useNavigate } from 'react-router-dom';

export default function ReadBook() {
    const navigate = useNavigate();
    const {bookID} = useParams();
    const [bookDetails, setBookDetails] = useState({});
    const [loading, setLoading] = useState(true)

    const methods = require('../../methods.js');
    methods.Student_verification();
    useEffect(()=>{
        if(localStorage.getItem("auth_studentID")=="" || localStorage.getItem("auth_studentID")==null){
            navigate("/student/login");
        }
    })

    const api = methods.API();
    let toast = require('../../toast.js');

    useEffect(() => {
        axios.post(api+'/library/searchIndividualBook', {
            //parameters
            _id : bookID
        })
            .then((response) => {
                setBookDetails(response.data.result[0]);
                setLoading(false);
            }, (error) => {
                console.log(error); toast.msg("Sorry, something went wrong", "", 3000);
            });
    }, [])
    //<iframe src={bookDetails.book_link} width="100%" height="700"></iframe>

    if(loading){
        return <Loading/>
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
                <LoadPDF book_link={bookDetails.book_link}/>
            
        </div>
    )
}
/*<Document file={bookDetails.book_link} onLoadSuccess={onDocumentLoadSuccess}>
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
                
                
        <div className="">
            <header className="App-header">
            <center>
                <div>
                <Document file={bookDetails.book_link} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(
                    new Array(numPages),
                    (el,index) => (
                        <Page 
                        height="500"
                        key={`page_${index+1}`}
                        pageNumber={index+1}
                        />
                    )
                    )}
                </Document>
                </div>
            </center>
            </header>
        </div>
                
                
                
                */