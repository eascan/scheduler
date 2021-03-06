import React, {useState} from "react";
import "components/Appointment/index.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const resetForm = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    resetForm();

    props.onCancel();
  };

  const onChange = function (e) {
    e.preventDefault();

    setName(e.target.value);
  };

  const onSubmit = function (e) {
    e.preventDefault();
  };

  //used for error messages
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else {
      setError("");
      props.onSave(name, interviewer);
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => onSubmit(event)}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => onChange(event)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
