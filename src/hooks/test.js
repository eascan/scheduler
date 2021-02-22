const appointment = {
  1: {
    id: 1,
    time: "12pm",
    interview: null,
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 6,
    },
  },
  3: {
    id: 3,
    time: "2pm",
    interview: null,
  },
  4: {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 6,
    },
  },
  5: {
    id: 5,
    time: "4pm",
    interview: {
      student: "Chad Takahashi",
      interviewer: 6,
    },
  },
  6: {
    id: 6,
    time: "12pm",
    interview: null,
  },
  7: {
    id: 7,
    time: "1pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 6,
    },
  },
  8: {
    id: 8,
    time: "2pm",
    interview: {
      student: "ed",
      interviewer: 1,
    },
  },
  9: {
    id: 9,
    time: "3pm",
    interview: {
      student: "Leopold Silvers",
      interviewer: 5,
    },
  },
  10: {
    id: 10,
    time: "4pm",
    interview: null,
  },
  11: {
    id: 11,
    time: "12pm",
    interview: {
      student: "Liam Martinez",
      interviewer: 7,
    },
  },
  12: {
    id: 12,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: 7,
    },
  },
  13: {
    id: 13,
    time: "2pm",
    interview: {
      student: "Edward",
      interviewer: 9,
    },
  },
  14: {
    id: 14,
    time: "3pm",
    interview: {
      student: "Maria Boucher",
      interviewer: 8,
    },
  },
  15: {
    id: 15,
    time: "4pm",
    interview: null,
  },
  16: {
    id: 16,
    time: "12pm",
    interview: null,
  },
  17: {
    id: 17,
    time: "1pm",
    interview: null,
  },
  18: {
    id: 18,
    time: "2pm",
    interview: null,
  },
  19: {
    id: 19,
    time: "3pm",
    interview: null,
  },
  20: {
    id: 20,
    time: "4pm",
    interview: {
      student: "Michael Chan-Montoya",
      interviewer: 1,
    },
  },
  21: {
    id: 21,
    time: "12pm",
    interview: null,
  },
  22: {
    id: 22,
    time: "1pm",
    interview: null,
  },
  23: {
    id: 23,
    time: "2pm",
    interview: {
      student: "Richard Wong",
      interviewer: 4,
    },
  },
  24: {
    id: 24,
    time: "3pm",
    interview: {
      student: "Yuko Smith",
      interviewer: 7,
    },
  },
  25: {
    id: 25,
    time: "4pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 6,
    },
  },
};

const days = [
  {
    id: 1,
    name: "Monday",
    appointments: [1, 2, 3, 4, 5],
    interviewers: [1, 2, 6, 9, 10],
    spots: 3,
  },
  {
    id: 2,
    name: "Tuesday",
    appointments: [6, 7, 8, 9, 10],
    interviewers: [1, 3, 5, 6, 9],
    spots: 2,
  },
  {
    id: 3,
    name: "Wednesday",
    appointments: [11, 12, 13, 14, 15],
    interviewers: [2, 5, 7, 8, 9],
    spots: 1,
  },
  {
    id: 4,
    name: "Thursday",
    appointments: [16, 17, 18, 19, 20],
    interviewers: [1, 3, 4, 5, 10],
    spots: 4,
  },
  {
    id: 5,
    name: "Friday",
    appointments: [21, 22, 23, 24, 25],
    interviewers: [1, 4, 6, 7, 9],
    spots: 3,
  },
];

const state = {
  days: days,
};

// function spotsRemaining(state, appointments) {
//   const appointmentEmpty = [];
//   const spotsArr = [];

//   if (state.length === 0) {
//     return appointmentEmpty;
//   } else {
//     for (const singleDay of state) {
//       let spots = 0;
//       for (const app of singleDay.appointments) {
//         if (appointments[app].interview) {
//           spots++;
//         }
//       }
//       spotsArr.push(spots);
//     }
//   }

//   for (const day of state) {
//     day.spots = spotsArr[day.id - 1];
//   }
// }

function spotsRemaining(state, appointments) {
  const appointmentEmpty = [];
  const spotsArr = [];
  const newState = {...state};

  if (newState.days.length === 0) {
    return appointmentEmpty;
  } else {
    for (const singleDay of newState.days) {
      let spots = 0;
      for (const app of singleDay.appointments) {
        if (appointments[app].interview) {
          spots++;
        }
      }
      spotsArr.push(spots);
    }
  }

  for (const day of newState.days) {
    day.spots = spotsArr[day.id - 1];
  }
  return newState.days;
}

console.log(spotsRemaining(state, appointment));
