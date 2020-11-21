import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClapButton from 'react-clap-button';

const AnswerList = () => {
  const [expand, setExpand] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  let notes = [
    {
      num: '1',
      content:
        'My name is JunSeoung Choi. The next alphabet for ‘a’ is ‘b’.',
      name: 'JunSeoung Choi',
      clap: '10',
    },
    {
      num: '2',
      content:
        'My name is JunSeoung Choi. The next alphabet for ‘a’ is ‘b’.',
      name: 'Dan Choi',
      clap: '1',
    },
  ]; // Todo: get notes list(현재 course,lecture, answer의 모든 note 가져오기)
  // To backend: 연결할 때 num이라는 property가 있는데,
  // 이거 그냥 처음 들어오는 순서대로 1부터 numbering 해주시면 됩니다!
  // 아니면 아무 숫자로 된 id같은 게 있으면 그냥 그걸 써도 되는데,
  // 어쨌든 answer별로 구분되는 고유의 무언가의 값이 들어있으면 됨.

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(0);
  };

  const AnswerElem = (props) => {
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
              <div className="body-text">{props.content}</div>
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
      <AnswerElem
        num={note.num}
        name={note.name}
        content={note.content}
        clap={note.clap}
      />
      <div className="divider" />
    </>
  ));

  return <div className="w-100">{rows}</div>;
};

export default AnswerList;
