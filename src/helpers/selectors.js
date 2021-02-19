// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2, 6, 9, 10],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1, 3, 5, 6, 9],
//     },
//   ],
//   appointments: {
//     1: {id: 1, time: "12pm", interview: null},
//     2: {id: 2, time: "1pm", interview: null},
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: {student: "Archie Cohen", interviewer: 2},
//     },
//     4: {id: 4, time: "3pm", interview: null},
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: {student: "Chad Takahashi", interviewer: 2},
//     },
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png",
//     },
//     2: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png",
//     },
//     3: {
//       id: 3,
//       name: "Mildred Nazir",
//       avatar: "https://i.imgur.com/T2WwVfS.png",
//     },
//     4: {
//       id: 4,
//       name: "Cohana Roy",
//       avatar: "https://i.imgur.com/FK8V841.jpg",
//     },
//     5: {
//       id: 5,
//       name: "Sven Jones",
//       avatar: "https://i.imgur.com/twYrpay.jpg",
//     },
//     6: {
//       id: 6,
//       name: "Susan Reynolds",
//       avatar: "https://i.imgur.com/TdOAdde.jpg",
//     },
//     7: {
//       id: 7,
//       name: "Alec Quon",
//       avatar: "https://i.imgur.com/3tVgsra.jpg",
//     },
//     8: {
//       id: 8,
//       name: "Viktor Jain",
//       avatar: "https://i.imgur.com/iHq8K8Z.jpg",
//     },
//     9: {
//       id: 9,
//       name: "Lindsay Chu",
//       avatar: "https://i.imgur.com/nPywAp1.jpg",
//     },
//     10: {
//       id: 10,
//       name: "Samantha Stanic",
//       avatar: "https://i.imgur.com/okB9WKC.jpg",
//     },
//   },
// };

function getAppointmentsForDay(state, day) {
  let appointmentsDay = [];
  const appointments = [];

  if (state.days.length === 0) {
    return appointments;
  } else {
    for (const singleDay of state.days) {
      // console.log("singleDay --->", singleDay);
      if (singleDay.name === day) {
        appointmentsDay = singleDay.appointments;
      }
    }
    // console.log(appointmentsDay);

    for (const app of appointmentsDay) {
      // const keys = Object.keys(state.appointments);
      // console.log("Every app for the day: ", app);
      // for (const key of keys) {
      // console.log("everykey:", key);
      // if (app == key) {
      // console.log(state.appointments.key);
      appointments.push(state.appointments[app]);
      // }
      // }
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
