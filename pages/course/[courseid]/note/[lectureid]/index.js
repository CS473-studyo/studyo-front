import React, { useState } from 'react';
import { Document, Page, Outline } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Header from 'components/header.js';
import NoteList from 'components/noteList.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

if (typeof window === 'undefined') {
  global.window = {};
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LectureNote() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const width = window.innerWidth * 0.4;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header></Header>
      <div className="mt-5 row ml-5 mr-5">
        <div className="row w-100">
          <div className="col lecture_note">
            <h1 className="title-text">Lecture Note</h1>
            <Document
              file="/sample.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <div className="mt-3 scrolling-wrapper border" width={width}>
                {Array.from(new Array(numPages), (el, index) => (
                  <div className="card">
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      renderMode="svg"
                      width={width / 4}
                    />
                  </div>
                ))}
              </div>
              <div className="border mb-2">
                <Page
                  pageNumber={pageNumber}
                  width={width}
                  renderMode="svg"
                />
              </div>
              <div class="d-flex justify-content-center">
                <button
                  className="lecture_btn p-2"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                >
                  <NavigateBeforeIcon></NavigateBeforeIcon>
                </button>
                <p className="body-text align-self-center p-2">
                  Page {pageNumber || (numPages ? 1 : '--')} of{' '}
                  {numPages || '--'}
                </p>
                <button
                  className="lecture_btn p-2"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                >
                  <NavigateNextIcon></NavigateNextIcon>
                </button>
              </div>
            </Document>
          </div>
          <div className="col">
            <h1 className="title-text">Notes from course students</h1>
            <NoteList />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LectureNote;
