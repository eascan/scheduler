import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    function selectedOrNot() {
      if (!props.interviewer) {
        return false;
      } else if (interviewer.id === props.interviewer) {
        return true;
      } else {
        return false;
      }
    }
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={selectedOrNot()}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
