import React, { Fragment } from 'react'


import "components/Appointment/styles.scss";

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';

// const classNames = require('classnames');



export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRMING = "CONFIRMING";
const EDITING = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

const {mode, transition, back} = useVisualMode(
  props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(response => transition(SHOW))
    //use replace boolean to replace status history and go to CREATE
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleting() {
    //Use replace boolean to replace confirm history and go to SHOW
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      //transition DELETING and ERROR_DELETE occur in the same function
      //hence, ERROR_DELETE will overwrite DELETING in history
      //Use replace boolean to replace DELETING history
      .catch(error => transition(ERROR_DELETE, true));
  }

  function confirming() {
    transition(CONFIRMING)
  }

  function editing() {
    transition(EDITING);
  }
  


  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": props.selected
  // })


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => {
        return transition(CREATE);
      }} />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editing}
          onDelete={confirming} />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {return back()}} />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRMING && (
        <Confirm
          onConfirm={() => deleting()}
          onCancel={() => {return back()}}
          message="Are you sure you want to delete?"
        />
      )}

      {mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={() => back()}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={() => back()}
        />
      )}


      {/* {props.interview ?  : } */}


    </article>

  );
}
