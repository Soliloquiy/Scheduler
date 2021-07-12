import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  //Use conditional to execute either an edit or a create form
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // const [error, setError] = useState('');

  const reset = function() {
    setName('');
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };

  // function validate() {
  //   if (name === '') {
  //     setError('Student name cannot be blank');
  //     return;
  //   }

  //   setError('');
  //   props.onSave(name, interviewer);
  // }

  return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        //Add value and onChange for controlled component
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={event => props.onSave(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
    
  );


}