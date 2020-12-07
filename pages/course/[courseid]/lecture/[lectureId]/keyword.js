import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Header from 'components/header';
import Footer from 'components/footer';
import LectureHeader from 'components/lectureHeader';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import * as keywordAPI from 'api/keyword';
import * as courseAPI from 'api/course';

import getServerSideProps from 'utils/checkAuth';
export { getServerSideProps };

const KeywordPage = (props) => {
  const router = useRouter();
  const { courseId, lectureId } = router.query;

  const [studentNum, setStudentNum] = useState(0);
  const [keywordList, setKeywordList] = useState([]);

  const [newKeyword, setNewKeyword] = useState();
  const onInput = ({ target: { value } }) => setNewKeyword(value);

  useEffect(() => {
    if (lectureId) {
      keywordAPI.getList(lectureId).then(({ data }) => {
        data.sort((a, b) => (a.id < b.id ? -1 : 1));
        setKeywordList(data);
      });
    }
  }, [lectureId]);

  useEffect(() => {
    if (courseId) {
      courseAPI.courseInfo(courseId).then(({ data }) => {
        setStudentNum(data.userNumber);
      });
    }
  }, [courseId]);

  const addKeyword = () => {
    if (newKeyword && !/^\s+$/.test(newKeyword))
      keywordAPI
        .add({
          lectureId: lectureId,
          word: newKeyword,
        })
        .then((res) => router.reload());
  };

  const Keyword = ({ keyword }) => {
    console.log(keyword);
    const [vote, setVote] = useState(
      keyword.Users.some((user) => user.id === props.id)
    );
    const selectKeyword = (id) => {
      keywordAPI.vote(id).then(() => {
        setVote(true);
        keywordAPI.getList(lectureId).then(({ data }) => {
          setKeywordList(data);
        });
      });
    };

    const unselectKeyword = (id) => {
      keywordAPI.cancel(id).then(() => {
        setVote(false);
        keywordAPI.getList(lectureId).then(({ data }) => {
          setKeywordList(data);
        });
      });
    };

    return (
      <div className="rounded border">
        <div className="d-flex justify-content-between p-2">
          <div className="body-text p-2">{keyword.word}</div>
          {vote ? (
            <button
              className="body-text btn btn-primary"
              onClick={() => unselectKeyword(keyword.id)}
            >
              <CheckCircleIcon />
            </button>
          ) : (
            <button
              className="body-text btn btn-outline-primary"
              onClick={() => selectKeyword(keyword.id)}
            >
              <CheckCircleOutlineIcon />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
      }}
      className="d-flex flex-column"
    >
      <Header name={props.name} badge={props.badge} />
      <LectureHeader courseId={courseId} lectureId={lectureId} />
      <div className="container mb-3 flex-grow-1">
        <div className="title-text mb-2 mt-5">Keywords</div>
        <div className="row">
          <div className="col">
            <div className="w-100">
              <div
                className="subtitle-text mb-4"
                style={{ color: '#234382' }}
              >
                Vote for this lecture's keywords.
              </div>
              {keywordList.map((keyword) => (
                <Keyword keyword={keyword} />
              ))}
              <div className="rounded border">
                <div className="d-flex justify-content-between p-2">
                  <InputGroup
                    className="body-text mr-5"
                    style={{ width: '65%' }}
                  >
                    <FormControl
                      placeholder="Add new keyword"
                      aria-label="newKeyword"
                      aria-describedby="basic-addon1"
                      onChange={onInput}
                    />
                  </InputGroup>
                  <button
                    className="body-text btn btn-outline-primary"
                    onClick={() => addKeyword()}
                  >
                    <AddCircleOutlineIcon className="mr-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="w-100">
              <div
                className="subtitle-text mb-4"
                style={{ color: '#234382' }}
              >
                Vote from classmates
              </div>
              {keywordList
                .sort((a, b) => b.votes - a.votes)
                .map((keyword) => {
                  let percent = (keyword.votes * 100) / studentNum;
                  return (
                    <div className="w-100 d-flex py-1 pl-2">
                      <div className="w-25">{keyword.word}</div>
                      <div className="w-75 progress my-1">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${percent}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax={`${studentNum}`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KeywordPage;
