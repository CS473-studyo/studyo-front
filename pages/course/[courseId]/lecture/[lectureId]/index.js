import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Header from 'components/header';
import Footer from 'components/footer';
import NoteList from 'components/noteList.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { SizeMe } from 'react-sizeme';

import * as noteAPI from 'api/note';
import * as lectureAPI from 'api/lecture';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LectureNote(props) {
  const router = useRouter();
  const { courseId, lectureId } = router.query;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState('');
  const [toggleComment, setToggleComment] = useState(false);
  const [show, setShow] = useState(false);

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
    if (lectureId) {
      lectureAPI.lectureInfo(lectureId).then(({ data }) => {
        setPdf(data.pdf);
      });
    }
  }, [lectureId, pdf]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const file = React.createRef();

  const handleFiles = () => {
    const pdf = file.current.files[0];
    const data = new FormData();
    data.append('file', pdf);

    noteAPI.upload(lectureId, data).then((res) => {
      router.reload();
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column"
    >
      <input
        type="file"
        accept=".pdf"
        id="input"
        ref={file}
        style={{ display: 'none' }}
        onInput={() => handleFiles()}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="title-text">
            Upload Your Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-text mb-3 text-center">
            You can add simple text notes by page.
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="custom-btn"
              onClick={() => {
                handleClose();
                setToggleComment(true);
              }}
            >
              Add/Edit text note on this page
            </button>
          </div>
          <hr />
          <div className="body-text mb-3 text-center">
            You can only upload notes in PDF format that you have written
            above the original lecture notes. The uploaded note must have
            the same number of pages as the original lecture note.
          </div>
          <div className="d-flex justify-content-center">
            <label className="custom-btn" for="input">
              Upload PDF
            </label>
          </div>
        </Modal.Body>
      </Modal>
      <Header name={props.name} badge={props.badge} />
      <div className="d-flex flex-column flex-grow-1">
        <Link href={`/course/${courseId}`}>
          <a
            className="d-flex align-items-center align-self-start ml-3"
            style={{
              fontFamily: 'NanumSquare Bold',
              fontSize: '16pt',
              textDecoration: 'none',
              color: '#234382',
              padding: '8px 0',
            }}
          >
            <ArrowBackIcon className="mr-1"></ArrowBackIcon>
            {courseId}
          </a>
        </Link>
        <Row noGutters>
          <Col
            lg="6"
            className="d-flex flex-column align-items-center align-items-lg-start"
          >
            <h1 className="title-text align-self-start ml-3">
              Lecture Note
            </h1>
            <div className="lecture-note">
              <SizeMe
                monitorHeight
                refreshRate={128}
                refreshMode={'debounce'}
                render={({ size }) => (
                  <div>
                    <Document
                      file={pdf}
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
                              className={
                                pageNumber - 1 === index
                                  ? 'card-selected'
                                  : `card`
                              }
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
          </Col>
          <Col lg="6" className="mx-3 my-4 m-lg-0 pr-lg-3">
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-lg-between">
              <h1 className="title-text" style={{ marginBottom: '0' }}>
                Students' notes on this page
              </h1>
              <button className="custom-btn my-3" onClick={handleShow}>
                Add/Edit notes
              </button>
            </div>
            <div>
              <NoteList
                LectureId={lectureId}
                page={pageNumber}
                UserId={props.id}
                userName={props.name}
                userBadge={props.badge}
                toggleComment={toggleComment}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}
export default LectureNote;
