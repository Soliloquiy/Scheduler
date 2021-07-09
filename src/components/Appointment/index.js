import React, { Fragment } from 'react'


import "components/Appointment/styles.scss";

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

// const classNames = require('classnames');



export default function Appointment(props) {



  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": props.selected
  // })


  return (
    <article className="appointment">
      <Header time={props.time}/>

      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={props.onEdit} onDelete={props.onDelete} /> : <Empty onAdd={props.onAdd} />}


    </article>

  );
}
