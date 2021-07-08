import React from "react";

import "components/InterviewerListItem.scss"

const classNames = require('classnames');



export default function InterviewListItem(props) {



  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item--selected-image": props.selected && props.avatar
  })


  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>

  );
}
