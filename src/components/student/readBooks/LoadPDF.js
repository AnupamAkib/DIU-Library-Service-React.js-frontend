import React from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useState } from 'react';

export default function LoadPDF(props) {
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
    <div className="table-responsive">
        <header className="App-header">
            <center>
                <div>
                <Document file={props.book_link} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(
                    new Array(numPages),
                    (el,index) => (
                        <Page 
                        height="700"
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
  )
}
