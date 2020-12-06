import React, { useEffect, useState } from 'react';
import * as answerAPI from 'api/answer';
import UserIcon from './UserIcon';
import Clap from '/public/clap.svg';

const AnswerList = ({ answers, admin }) => {
  const [expand, setExpand] = useState(-1);
  const [totalCount, setTotalCount] = useState(0);
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

  const approveAnswer = (answerId) => {
    answerAPI.approve(answerId);
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
                  className="btn subtitle-text w-100"
                  type="button"
                  onClick={() => expandToggle(props.index)}
                >
                  <div
                    style={{ fontWeight: '600' }}
                    className="d-flex justify-content-between ml-1"
                  >
                    <div className="row">
                      <div className="p-2 ml-2">{props.name}</div>
                      <UserIcon className="p-2" badge={props.badge} />
                    </div>
                    <div className="row align-items-center">
                      {props.approved ? (
                        <div
                          className="body-text align-middle text-center mr-3 px-3 py-1"
                          style={{
                            borderRadius: '3px',
                            backgroundColor: 'green',
                            color: 'white',
                          }}
                        >
                          Approved
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </button>
              </h5>
            </div>
            <div className="card-body">
              {props.approved ? (
                <div className="body-text mb-2" style={{ color: 'green' }}>
                  This answer is approved by TA
                </div>
              ) : (
                <></>
              )}
              <div className="body-text">{props.content}</div>
              {admin ? (
                <div className="w-100 row align-items-center mt-2">
                  <div
                    className="col body-text align-center text-right"
                    style={{ color: '#234382' }}
                  >
                    {totalCount} claps for this answer!
                  </div>
                  <button
                    className="clap-btn"
                    onClick={() => approveAnswer(props.id)}
                  >
                    <div className="body-text">Approve</div>
                  </button>
                </div>
              ) : (
                <div className="w-100 row align-items-center mt-2">
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
                      <Clap width="20px" fill="#ffffff" />
                    ) : (
                      <Clap width="20px" fill="#234382" />
                    )}
                  </button>
                </div>
              )}
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
                  className="btn subtitle-text w-100"
                  type="button"
                  onClick={() => expandToggle(props.index)}
                >
                  <div
                    style={{ fontWeight: '600' }}
                    className="d-flex justify-content-between ml-1"
                  >
                    <div className="row">
                      <div className="p-2 ml-2">{props.name}</div>
                      <UserIcon className="p-2" badge={props.badge} />
                    </div>
                    <div className="row align-items-center">
                      {props.approved ? (
                        <div
                          className="body-text align-middle text-center mr-3 px-3 py-1"
                          style={{
                            borderRadius: '3px',
                            backgroundColor: 'green',
                            color: 'white',
                          }}
                        >
                          Approved
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
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
          approved={answer.isSelected}
        />
        <div className="divider" />
      </>
    );
  });

  return <div className="w-100">{rows}</div>;
};

export default AnswerList;
