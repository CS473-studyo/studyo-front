import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClapButton from 'react-clap-button';
import { Document, Page } from 'react-pdf';
import { SizeMe } from 'react-sizeme';

import * as noteAPI from 'api/note';

if (typeof window === 'undefined') {
  global.window = {};
}
const NoteList = ({ notes, pageNumber }) => {
  const [expand, setExpand] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(-1);
  };

  const clapNote = (noteId) => {
    noteAPI.clap(noteId).then((res) => {
      console.log('hi');
      setTotalCount(totalCount + 1);
    });
  };

  useEffect(() => {
    if (notes && expand !== -1) {
      noteAPI.getClap(notes[expand].id).then((res) => {
        console.log(res.data);
        setTotalCount(res.data);
      });
      // setTotalCount(answers[expand].clap);
    }
  }, [expand]);

  const NoteElem = (props) => {
    const isSelected = props.num === expand;
    const leftBarColor = isSelected ? '#234382' : '#DFDFDF';

    const userNote = (
      <div className="card-body">
        <SizeMe
          monitorHeight
          refreshRate={128}
          refreshMode={'debounce'}
          render={({ size }) => (
            <>
              <Document file={props.pdf}>
                <Page
                  pageNumber={props.pageNumber}
                  width={size.width}
                  renderAnnotationLayer={false}
                />
              </Document>
              <div className="w-100 row align-items-center">
                <div className="col body-text align-center">
                  {totalCount} claps for this note!{' '}
                </div>
                <ClapButton
                  className="col"
                  count={0}
                  countTotal={props.clap}
                  isClicked={false}
                  maxCount={3}
                  onCountChange={() => clapNote(notes[expand].id)}
                  theme={{
                    secondaryColor: '#234382',
                  }}
                />
              </div>
            </>
          )}
        />
      </div>
    );

    return (
      <div className="row">
        <div style={{ backgroundColor: leftBarColor, width: '3px' }} />
        <div className="col w-100 border border-light pr-0 pl-0">
          <div
            className={isSelected ? 'list-selected' : 'list-unselected'}
          >
            <h5 className="mb-0">
              <button
                className="btn subtitle-text"
                type="button"
                onClick={() => expandToggle(props.num)}
              >
                <div className="row ml-1">
                  <AccountCircleIcon className="mr-3"></AccountCircleIcon>
                  {props.name}
                </div>
              </button>
            </h5>
          </div>
          {isSelected ? userNote : null}
        </div>
      </div>
    );
  };

  const rows = notes.map((note, index) => (
    <>
      <NoteElem
        num={index}
        pageNumber={pageNumber}
        pdf={note.pdf}
        clap={note.clap}
        name={note.User.name}
      />
      <div className="divider" />
    </>
  ));

  return <div>{rows}</div>;
};

export default NoteList;
