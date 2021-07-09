import React from "react"

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";



export default function InterviewerList(props) {

  let interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        //setInterview updates props.interviewer to interviewer id of clicked item (avatar)
        //This will trigger selected
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}