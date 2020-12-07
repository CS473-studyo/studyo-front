import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Modal } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import { SizeMe } from 'react-sizeme';
import Clap from 'components/clap';
import * as noteAPI from 'api/note';
import UserIcon from './UserIcon';

if (typeof window === 'undefined') {
  global.window = {};
}

const parseGroupedNotes = (notes) => {
  const parsedNotes = { pages: new Map() };
  notes.forEach((note) => {
    if (note.page === -1) {
      parsedNotes.pdf = note.pdf;
    } else {
      parsedNotes.pages.set(note.page, note.text);
    }
    parsedNotes.user = note.User;
  });
  return parsedNotes;
};

const groupNotesByUser = (notes) => {
  const UserIdSet = new Set();
  notes.forEach((note) => {
    UserIdSet.add(note.UserId);
  });
  const groupedNotes = [];
  UserIdSet.forEach((id) => {
    const userNotes = notes.filter((note) => note.UserId === id);
    groupedNotes.push(parseGroupedNotes(userNotes));
  });
  return groupedNotes;
};

const NoteList = ({
  LectureId,
  page,
  UserId,
  userName,
  userBadge,
  toggleComment,
}) => {
  const router = useRouter();
  const [expand, setExpand] = useState(-1);
  const [userNotes, setUserNotes] = useState({ pages: new Map() });
  const [otherNotes, setOtherNotes] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    const comment = userNotes.pages.get(page);
    setNewComment(comment);
  }, [userNotes]);

  useEffect(() => {
    noteAPI.userLectureNotes(LectureId, page).then(({ data }) => {
      setUserNotes(parseGroupedNotes(data));
    });
    noteAPI.otherLectureNotes(LectureId, page).then(({ data }) => {
      setOtherNotes(groupNotesByUser(data));
    });
  }, [page]);

  const expandToggle = (index) => {
    setExpand(expand !== index ? index : -1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    noteAPI
      .comment(LectureId, page, newComment)
      .then(() => router.reload());
  };

  const NoteElem = ({ index, user, pdf, comment, owner }) => {
    const isSelected = index === expand;
    const leftBarColor = isSelected ? '#234382' : '#DFDFDF';

    return (
      <div className="row ml-1">
        <div style={{ backgroundColor: leftBarColor, width: '3px' }} />
        <div className="col w-100 border border-light pr-0 pl-0">
          <div
            className="d-flex align-items-center"
            style={{
              cursor: 'pointer',
              height: '50px',
              backgroundColor: isSelected ? '#ebebeb' : 'white',
              paddingLeft: '16px',
            }}
            onClick={() => expandToggle(index)}
          >
            <div className="d-flex justify-content-between ml-1">
              <div
                style={{ fontWeight: '600' }}
                className="d-flex align-items-center"
              >
                <div style={{ paddingRight: '8px' }}>{user.name}</div>
                <UserIcon className="p-2" badge={user.badge} />
              </div>
            </div>
          </div>
          {isSelected ? (
            <div>
              <div className="body-text" style={{ padding: '16px 24px' }}>
                {comment}
              </div>
              {pdf ? (
                <SizeMe
                  monitorHeight
                  refreshRate={128}
                  refreshMode={'debounce'}
                  render={({ size }) => (
                    <>
                      <Document file={pdf}>
                        <Page
                          pageNumber={page}
                          width={size.width}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </>
                  )}
                />
              ) : null}
              <Clap LectureId={LectureId} UserId={user.id} page={page} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const userTab =
    userNotes && (userNotes.pdf || userNotes.pages.size > 0)
      ? [
          <NoteElem
            owner
            className="ml-3"
            index={0}
            user={{ name: userName, id: UserId, badge: userBadge }}
            pdf={userNotes.pdf}
            comment={userNotes.pages.get(page)}
          />,
        ]
      : [];

  console.log(userNotes);

  const otherTabs = otherNotes.map((note, index) => (
    <NoteElem
      className="ml-3"
      index={index + 1}
      user={{
        name: note.user.name,
        id: note.user.id,
        badge: note.user.badge,
      }}
      pdf={note.pdf}
      comment={note.pages.get(page)}
    />
  ));

  const rows = userTab.concat(otherTabs);

  return (
    <div>
      {toggleComment ? (
        <Form
          style={{ marginRight: '16px', paddingBottom: '16px' }}
          className="d-flex flex-column align-items-right"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="subtitle-text">Your comment</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(value) => setNewComment(value.target.value)}
              value={newComment}
            />
          </Form.Group>
          <button type="submit" className="custom-btn">
            Save
          </button>
        </Form>
      ) : null}
      {rows}
    </div>
  );
};

export default NoteList;
