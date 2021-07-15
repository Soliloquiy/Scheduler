import React from "react";

import "components/DayListItem.scss";

const classNames = require("classnames");

//Function to return message based on number of spots remaining
const formatSpots = function (spots) {
  if (spots === 0) {
    return "no spots remaining";
  }

  if (spots === 1) {
    return "1 spot remaining";
  }

  if (spots === 2) {
    return "2 spots remaining";
  }

  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  //Use classNames to enable dynamic classes based on prop data
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
