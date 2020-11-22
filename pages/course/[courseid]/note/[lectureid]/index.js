import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Document, Page, Outline } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Header from 'components/header.js';
import NoteList from 'components/noteList.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

if (typeof window === 'undefined') {
  global.window = {};
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LectureNote() {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [notes, setNotes] = useState([
    {
      num: '1',
      name: 'Daeun Choi',
      clap: '2',
    },
    {
      num: '2',
      name: 'Dan Choi',
      clap: '5',
    },
  ]); // Todo: get notes list(현재 course,lecture의 모든 note 가져오기)
  // To backend: 연결할 때 num이라는 property가 있는데,
  // 이거 그냥 처음 들어오는 순서대로 1부터 numbering 해주시면 됩니다!
  // 아니면 아무 숫자로 된 id같은 게 있으면 그냥 그걸 써도 되는데,
  // 어쨌든 answer별로 구분되는 고유의 무언가의 값이 들어있으면 됨.)
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
      <div className="mt-3 row ml-5 mr-5">
        <Link href={`/course/${courseid}`}>
          <a
            className="subtitle-text mb-2"
            style={{ textDecoration: 'none', color: '#234382' }}
          >
            <ArrowBackIcon
              fontSize="large"
              classNmae="mr-1"
            ></ArrowBackIcon>
            {courseid}
          </a>
        </Link>
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
            <a
              // href={`/course/${courseid}/`}
              type="button"
              className="mt-4 custom-btn float-right"
            >
              Upload My Note
            </a>
          </div>
          <div className="col">
            <h1 className="title-text">Notes from course students</h1>
            <NoteList notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LectureNote;
