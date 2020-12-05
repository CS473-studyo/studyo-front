import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Header from 'components/header.js';
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
  const { courseid, lectureid } = router.query;

  const [studentNum, setStudentNum] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [keywordSelection, setKeywordSelection] = useState([]);

  const [newKeyword, setNewKeyword] = useState();
  const onInput = ({ target: { value } }) => setNewKeyword(value);

  useEffect(() => {
    if (lectureid) {
      keywordAPI.getUserList(lectureid).then(({ data }) => {
        const newKeywordSelection = [];
        data.map((selected) => newKeywordSelection.push(selected.id));
        setKeywordSelection(newKeywordSelection);
      });
    }
  }, [lectureid]);

  useEffect(() => {
    if (lectureid) {
      keywordAPI.getList(lectureid).then(({ data }) => {
        setKeywords(data);
      });
    }
  }, [lectureid]);

  useEffect(() => {
    if (courseid) {
      courseAPI.courseInfo(courseid).then(({ data }) => {
        setStudentNum(data.userNumber);
      });
    }
  }, [courseid]);

  const selectKeyword = (keyword) => {
    const newKeywordSelection = keywordSelection.slice();
    newKeywordSelection.push(keyword.id);
    setKeywordSelection(newKeywordSelection);
    keywordAPI.vote(keyword.id).then(() => {
      keywordAPI.getList(lectureid).then(({ data }) => {
        setKeywords(data);
      });
    });
  };

  const unselectKeyword = (keyword) => {
    const newKeywordSelection = keywordSelection.slice();
    const idx = newKeywordSelection.indexOf(keyword.id);
    if (idx > -1) newKeywordSelection.splice(idx, 1);
    setKeywordSelection(newKeywordSelection);
    keywordAPI.cancel(keyword.id).then(() => {
      keywordAPI.getList(lectureid).then(({ data }) => {
        setKeywords(data);
      });
    });
  };

  const addKeyword = () => {
    if (newKeyword && !/^\s+$/.test(newKeyword))
      keywordAPI
        .add({
          lectureId: lectureid,
          word: newKeyword,
        })
        .then((res) => router.reload());
  };

  const Keyword = ({ keyword }) => {
    if (keywordSelection.includes(keyword.id))
      return (
        <div className="rounded border">
          <div className="d-flex justify-content-between p-2">
            <div className="body-text p-2">{keyword.word}</div>
            <button
              className="body-text btn btn-primary"
              onClick={() => unselectKeyword(keyword)}
            >
              <CheckCircleIcon />
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="rounded border">
          <div className="d-flex justify-content-between p-2">
            <div className="body-text p-2">{keyword.word}</div>
            <button
              className="body-text btn btn-outline-primary"
              onClick={() => selectKeyword(keyword)}
            >
              <CheckCircleOutlineIcon />
            </button>
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
      <Header name={props.name} />
      <LectureHeader courseid={courseid} lectureid={lectureid} />
      <div className="container">
        <div className="title-text mb-2 mt-5">Keyword</div>
        <div className="row">
          <div className="col">
            <div className="w-100">
              <div
                className="subtitle-text mb-4"
                style={{ color: '#234382' }}
              >
                Vote for this lecture's keyword.
              </div>
              {keywords.map((keyword) => (
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
              {keywords
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
    </div>
  );
};

export default KeywordPage;
