import React, { useState } from 'react';
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
                  // className="col"
                  count={50}
                  countTotal={0}
                  // isClicked={true}
                  // maxCount={3}
                  onCountChange={function onCountChange(_, total) {
                    setTotalCount(total);
                  }}
                  // theme={{
                  //   secondaryColor: '#234382',
                  // }}
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
