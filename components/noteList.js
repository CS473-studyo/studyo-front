import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClapButton from 'react-clap-button';

if (typeof window === 'undefined') {
  global.window = {};
}
const NoteList = ({ notes }) => {
  const [expand, setExpand] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
                  <div className="row ml-1">
                    <AccountCircleIcon className="mr-3"></AccountCircleIcon>
                    {props.name}
                  </div>
                </button>
              </h5>
            </div>
            <div className="card-body">
              <img
                className="w-100 mb-2"
                src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F1930A949512D50450C"
              />
              <div className="w-100 row align-items-center">
                <div className="col body-text align-center">
                  {totalCount} claps for this note!{' '}
                </div>
                <ClapButton
                  className="col"
                  count={0}
                  countTotal={totalCount}
                  isClicked={false}
                  maxCount={3}
                  onCountChange={function onCountChange() {
                    setTotalCount((totalCount) => totalCount + 1);
                  }}
                  theme={{
                    secondaryColor: '#234382',
                  }}
                />
              </div>
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
                  <div className="row ml-1">
                    <AccountCircleIcon className="mr-3"></AccountCircleIcon>
                    {props.name}
                  </div>
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
