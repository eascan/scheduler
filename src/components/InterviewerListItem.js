import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let listClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const interviewerName = function (props) {
    if (props.selected) {
      return props.name;
    } else {
      return null;
    }
  };

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {interviewerName(props)}
    </li>
  );
}
