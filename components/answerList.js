import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClapButton from 'react-clap-button';
import { Button } from 'react-bootstrap';
import * as answerAPI from 'api/answer';
import UserIcon from './UserIcon';
import Clap from '../public/Clap.svg';

const AnswerList = ({ answers }) => {
  const [expand, setExpand] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);
  const [approvalDisplay, setApprovalDiaplay] = useState(<></>);
  const [clapOn, setClapOn] = useState(false);

  const toggleClap = () => setClapOn(!clapOn);

  const expandToggle = (num) => {
    if (expand !== num) setExpand(num);
    else setExpand(-1);
  };

  const clapAnswer = (answerId) => {
    answerAPI.clap(answerId).then((res) => {
      setTotalCount(totalCount + 1);
    });
  };

  useEffect(() => {
    setExpand(-1);
    setTotalCount(0);
  }, [answers]);

  useEffect(() => {
    if (answers && expand !== -1) {
      answerAPI.getClap(answers[expand].id).then(({ data }) => {
        setTotalCount(data);
      });
      console.log(answers[expand]);
      if (answers[expand].isSelected)
        setApprovalDiaplay(
          <div className="body-text mb-2" style={{ color: '#3B9312' }}>
            This answer is approved by TA
          </div>
        );
      else setApprovalDiaplay(<></>);
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
                  <div style={{ fontWeight: '600' }} className="row ml-1">
                    {props.name}
                    <UserIcon badge={props.badge} />
                  </div>
                </button>
              </h5>
            </div>
            <div className="card-body">
              {approvalDisplay}
              <div className="body-text">{props.content}</div>
              <div className="w-100 row align-items-center">
                <div
                  className="col body-text align-center text-right"
                  style={{ color: '#234382' }}
                >
                  {totalCount} claps for this answer!
                </div>
                <button
                  className="clap-btn"
                  onMouseEnter={toggleClap}
                  onMouseLeave={toggleClap}
                  onClick={() => clapAnswer(props.id)}
                >
                  {clapOn ? (
                    <Clap width="30px" fill="#ffffff" />
                  ) : (
                    <Clap width="30px" fill="#234382" />
                  )}
                </button>
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
                  <div style={{ fontWeight: '600' }} className="row ml-1">
                    {props.name}
                    <UserIcon badge={props.badge} />
                  </div>
                </button>
              </h5>
            </div>
          </div>
        </div>
      );
  };

  const rows = answers.map((answer, index) => {
    return (
      <>
        <AnswerElem
          id={answer.id}
          index={index}
          name={answer.User.name}
          content={answer.content}
          clap={answer.clap}
          badge={answer.User.badge}
        />
        <div className="divider" />
      </>
    );
  });

  return <div className="w-100">{rows}</div>;
};

export default AnswerList;
