import React, { useState } from 'react';
import { Document, Page, Outline } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function MyApp() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }

    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
    }
  
    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
  
    function previousPage() {
      changePage(-1);
    }
  
    function nextPage() {
      changePage(1);
    }

  return (
    <div>
    <Document
        file="https://hcikim.github.io/assets/CHI_UI.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        
    >
        <div class="scrolling-wrapper">
            {Array.from(new Array(numPages),
            (el, index) => (
                <div class="card">
                    <h2 class="title-text">Page {index}</h2>
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderMode="svg"
                        className="thumbnail-pdf"
                    />
                </div>
                ),
            )}
        </div>
        <Page pageNumber={pageNumber || 1} renderMode="svg" />
    </Document>
    <div>
        <p>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
        <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
        >
            Previous
        </button>
        <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
        >
            Next
        </button>
    </div>
        
        <p>Page {pageNumber} of {numPages}</p>
        </div>
  );
}
export default MyApp;