import React from "react";

import "components/Appointment/styles.scss";

// const classNames = require('classnames');



export default function Appointment(props) {



  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": props.selected
  // })


  return (
    <article className="appointment">{props.time}</article>

  );
}
