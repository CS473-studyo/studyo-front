import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Header from 'components/header.js';

export default function Home() {
  const [expand, setExpand] = useState(0);

  let notes = [
    { num: '1', name: 'Daeun Choi', content: 'Collapsible Group Item #1' },
    { num: '2', name: 'Dan Choi', content: 'Collapsible Group Item #2' },
  ];

  const NoteElem = (props) => {
    if (props.num === expand)
      return (
        <Card>
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                onClick={() => setExpand(props.num)}
              >
                {props.name}
              </button>
            </h5>
          </div>

          <div>
            <div class="card-body">{props.content}</div>
          </div>
        </Card>
      );
    else
      return (
        <Card>
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                onClick={() => setExpand(props.num)}
              >
                {props.name}
              </button>
            </h5>
          </div>
        </Card>
      );
  };

  const rows = notes.map((note) => (
    <>
      <NoteElem num={note.num} name={note.name} content={note.content} />
      <div className="divider" />
    </>
  ));

  return (
    <div>
      <h1>{expand}</h1>
      <button onClick={() => setExpand(1)}>Click me 1</button>
      <button onClick={() => setExpand(2)}>Click me 2</button>
      {/* {rows} */}
    </div>
  );
}
