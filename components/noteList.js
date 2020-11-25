import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Document, Page } from 'react-pdf';
import { SizeMe } from 'react-sizeme';
import Clap from 'components/clap';
import * as noteAPI from 'api/note';

if (typeof window === 'undefined') {
  global.window = {};
}
const NoteList = ({ notes, pageNumber }) => {
  const [expand, setExpand] = useState(-1);

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(-1);
  };

  const NoteElem = (props) => {
    const isSelected = props.num === expand;
    const leftBarColor = isSelected ? '#234382' : '#DFDFDF';

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
          {isSelected ? (
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
                    <Clap noteId={props.noteId} />
                  </>
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const rows = notes.map((note, index) => (
    <>
      <NoteElem
        noteId={note.id}
        num={index}
        pageNumber={pageNumber}
        pdf={note.pdf}
        name={note.User.name}
      />
      <div className="divider" />
    </>
  ));

  return <div>{rows}</div>;
};

export default NoteList;
