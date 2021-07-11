import React, { Fragment } from 'react'


import "components/Appointment/styles.scss";

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';

import useVisualMode from 'hooks/useVisualMode';

// const classNames = require('classnames');



export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';

const {mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY
  );


  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": props.selected
  // })


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => {
        return transition(CREATE);
      }} />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete} />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={() => { console.log('save') }}
          onCancel={() => { return back() }} />
      )}

      {/* {props.interview ?  : } */}


    </article>

  );
}
