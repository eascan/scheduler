function getAppointmentsForDay(state, day) {
  let appointmentsDay = [];
  const appointments = [];

  if (state.days.length === 0) {
    return appointments;
  } else {
    for (const singleDay of state.days) {
      if (singleDay.name === day) {
        appointmentsDay = singleDay.appointments;
      }
    }

    for (const app of appointmentsDay) {
      appointments.push(state.appointments[app]);
    }
  }
  return appointments;
}

function getInterview(state, interview) {
  let newInterview = {};

  if (interview === null) {
    return null;
  }
  newInterview["student"] = interview.student;

  for (const interviewer in state.interviewers) {
    if (interviewer == interview.interviewer) {
      newInterview["interviewer"] = state.interviewers[interviewer];
    }
  }
  return newInterview;
}

function getInterviewersForDay(state, day) {
  let interviewersDay = [];
  const interviewers = [];

  if (state.days.length === 0) {
    return interviewers;
  } else {
    for (const singleDay of state.days) {
      if (singleDay.name === day) {
        interviewersDay = singleDay.interviewers;
      }
    }

    for (const interviewer of interviewersDay) {
      interviewers.push(state.interviewers[interviewer]);
    }
  }
  return interviewers;
}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay};
