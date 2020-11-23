import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClapButton from 'react-clap-button';
import * as answerAPI from 'api/answer';

const AnswerList = ({ answers }) => {
  const [expand, setExpand] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(-1);
  };

  const clapAnswer = (answerId) => {
    answerAPI.clap(answerId).then((res) => {
      setTotalCount(totalCount + 1);
    });
  };

  // const getclap = (answerId) => {
  //   useEffect(() => {
  //     answerAPI.getClap(answerId).then((res) => {
  //       setTotalCount(res.data.clap);
  //     });
  //   });
  // };

  useEffect(() => {
    if (answers && expand !== -1) {
      console.log('yahoo');
      setTotalCount(answers[expand].clap);
    }
  }, [expand]);

  const AnswerElem = (props) => {
    if (props.index === expand)
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
                  onClick={() => expandToggle(props.index)}
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
                  {totalCount} claps for this note!
                </div>
                <ClapButton
                  className="col"
                  count={0}
                  countTotal={props.clap}
                  isClicked={false}
                  maxCount={3}
                  onCountChange={() => clapAnswer(props.id)}
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
                  onClick={() => expandToggle(props.index)}
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

  const rows = answers.map((answer, index) => (
    <>
      <AnswerElem
        id={answer.id}
        index={index}
        name={answer.name}
        content={answer.content}
        clap={answer.clap}
      />
      <div className="divider" />
    </>
  ));

  return <div className="w-100">{rows}</div>;
};

export default AnswerList;
