import React, { PureComponent, useEffect, useState } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Header from 'components/header.js';
import NoteList from 'components/noteList.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ReactFileReader from 'react-file-reader';

import { SizeMe } from 'react-sizeme';

import * as noteAPI from 'api/note';

if (typeof window === 'undefined') {
  global.window = {};
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LectureNote() {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    router.reload(`/course/${courseid}/note/${lectureid}`);
  };
  const handleShow = () => setShow(true);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [notes, setNotes] = useState([]);

  function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
    setPageNumber(1);
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

  useEffect(() => {
    noteAPI.lectureNotes(lectureid).then((res) => {
      setNotes(res.data);
    });
  }, [lectureid]);

  const file = React.createRef();

  const handleFiles = () => {
    const pdf = file.current.files[0];
    const data = new FormData();
    data.append('file', pdf);

    console.log(pdf);

    noteAPI.upload(lectureid, data).then((res) => {
      router.reload();
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header></Header>
      <div className="mt-3 row ml-5 mr-5">
        <Link href={`/course/${courseid}`}>
          <a
            className="subtitle-text mb-2"
            style={{ textDecoration: 'none', color: '#234382' }}
          >
            <ArrowBackIcon
              fontSize="large"
              className="mr-1"
            ></ArrowBackIcon>
            {courseid}
          </a>
        </Link>
        <div className="row w-100">
          <div className="col lecture_note">
            <h1 className="title-text">Lecture Note</h1>
            <SizeMe
              monitorHeight
              refreshRate={128}
              refreshMode={'debounce'}
              render={({ size }) => (
                <div>
                  <Document
                    file="/sample.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <div
                      className="mt-3 scrolling-wrapper border"
                      width={size.width}
                    >
                      {Array.from(
                        new Array(numPages),
                        (el, index) => (
                          <div
                            className="card"
                            onClick={() => setPageNumber(index + 1)}
                          >
                            <Page
                              key={index}
                              pageIndex={index}
                              width={size.width / 5}
                              renderAnnotationLayer={false}
                            />
                          </div>
                        ),
                        this
                      )}
                    </div>
                    <Page
                      pageNumber={pageNumber}
                      width={size.width}
                      renderAnnotationLayer={false}
                    />
                    <div class="d-flex justify-content-between align-items-center">
                      <button
                        className="lecture_btn p-2"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                      >
                        <NavigateBeforeIcon style={{ width: '18px' }} />
                      </button>
                      <div>
                        Page {pageNumber || (numPages ? 1 : '--')} of{' '}
                        {numPages || '--'}
                      </div>
                      <button
                        className="lecture_btn p-2"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                      >
                        <NavigateNextIcon style={{ width: '18px' }} />
                      </button>
                    </div>
                  </Document>
                </div>
              )}
            />
          </div>
          <Col>
            <div className="d-flex flex-row justify-content-between student-note">
              <h1 className="title-text">Notes from course students</h1>
              <input
                type="file"
                accept=".pdf"
                id="input"
                ref={file}
                style={{ display: 'none' }}
                onInput={() => handleFiles()}
              />
              <button className="custom-btn" onClick={handleShow}>
                Upload My Note
              </button>
              {/* <ReactFileReader
                handleFiles={handleFiles}
                fileTypes={'.pdf'}
              >
                <button className="custom-btn">Upload My Note</button>
              </ReactFileReader> */}
            </div>
            <div className="pl-3">
              <NoteList pageNumber={pageNumber} notes={notes} />
            </div>
          </Col>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Your Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-text mb-4 text-center">
            You can only upload notes in PDF format that you have written
            above the original Lecture notes. The uploaded note must have
            the same number of pages as the original copy note.
          </div>
          <div className="d-flex justify-content-center">
            <label className="custom-btn" for="input">
              Upload PDF
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default LectureNote;
