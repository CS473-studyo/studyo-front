import React, { PureComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Document, Page, Outline } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import Header from 'components/header.js';
import NoteList from 'components/noteList.js';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ReactFileReader from 'react-file-reader';
import { NotListedLocationSharp } from '@material-ui/icons';

import { SizeMe } from 'react-sizeme';

import * as noteAPI from 'api/note';

if (typeof window === 'undefined') {
  global.window = {};
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LectureNote() {
  const router = useRouter();
  const { courseid, lectureid } = router.query;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(window.innerWidth * 0.4);
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

  function onDocumentLoadSuccess(pdf) {
    setNumPages(pdf.numPages);
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
  useEffect(() => {
    setWidth(window.innerWidth * 0.4);
  }, [window.innerWidth]);

  const handleFiles = (files) => {
    const pdf = files[0];

    // const storeAsImage = fromBase64(files.base64);

    // console.log(storeAsImage);
    const data = new FormData();
    data.append('file', pdf);

    noteAPI.upload(lectureid, data).then((res) => {
      // router.reload()
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
                              width={size.width / 4}
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
            <ReactFileReader
              handleFiles={(e) => handleFiles(e)}
              fileTypes={'.pdf'}
              // base64={true}
            >
              <button className="btn">Upload My Note</button>
            </ReactFileReader>
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
