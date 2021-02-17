import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let listClass = classnames("day-list__item", {
    "day-list__item--full": !props.spots,
    "day-list__item--selected": props.selected,
  });

  const formatSpots = function (props) {
    switch (props.spots) {
      case 0:
        return "no spots remaining";
      case 1:
        return "1 spot remaining";
      default:
        return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
