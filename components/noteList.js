import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NoteList = () => {
  const [expand, setExpand] = useState(0);

  let notes = [
    {
      num: '1',
      name: 'Daeun Choi',
      content: 'Collapsible Group Item #1',
      clap: '2',
    },
    {
      num: '2',
      name: 'Dan Choi',
      content: 'Collapsible Group Item #2',
      clap: '2',
    },
  ];

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(0);
  };

  const NoteElem = (props) => {
    if (props.num === expand)
      return (
        <div className="row">
          <div
            style={{ backgroundColor: '#234382', width: 3 + 'px' }}
          ></div>
          <div className="col w-100 border pr-0 pl-0">
            <div className="list-selected">
              <h5 className="mb-0">
                <button
                  className="btn subtitle-text"
                  type="button"
                  onClick={() => expandToggle(props.num)}
                >
                  <AccountCircleIcon className="mr-3"></AccountCircleIcon>
                  {props.name}
                  {props.clap}
                </button>
              </h5>
            </div>
            <div className="card-body">
              <div>{props.content}</div>
              <img
                className="w-100"
                src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F1930A949512D50450C"
              />
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="row">
          <div
            style={{ backgroundColor: '#DFDFDF', width: 3 + 'px' }}
          ></div>
          <div className="col w-100 border border-light pr-0 pl-0">
            <div className="list-unselected">
              <h5 className="mb-0">
                <button
                  className="btn subtitle-text"
                  type="button"
                  onClick={() => expandToggle(props.num)}
                >
                  <AccountCircleIcon className="mr-3"></AccountCircleIcon>
                  {props.name}
                  {props.clap}
                </button>
              </h5>
            </div>
          </div>
        </div>
      );
  };

  const rows = notes.slice(0, notes.length).map((note) => (
    <>
      <NoteElem
        num={note.num}
        name={note.name}
        content={note.content}
        clap={note.clap}
      />
      <div className="divider" />
    </>
  ));

  return <div>{rows}</div>;
};

export default NoteList;
