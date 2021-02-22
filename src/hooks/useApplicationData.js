import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((responses) => {
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = spotsRemaining(state, appointments);

    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        console.log("success!!");
        return setState({...state, appointments, days});
      });
  }

  const setDay = (day) => setState({...state, day});

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      console.log("deleted!");
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const days = spotsRemaining(state, appointments);
      return setState({...state, appointments, days});
    });
  }

  function spotsRemaining(state, appointments) {
    const appointmentEmpty = [];
    const spotsArr = [];
    const newState = {...state};
    const days = [];

    if (newState.days.length === 0) {
      return appointmentEmpty;
    } else {
      for (const singleDay of newState.days) {
        let spots = 0;
        for (const app of singleDay.appointments) {
          if (!appointments[app].interview) {
            spots++;
          }
        }
        spotsArr.push(spots);
      }
    }

    for (const day of newState.days) {
      const newDay = {...day};
      newDay.spots = spotsArr[day.id - 1];
      days.push(newDay);
    }
    return days;
  }
  return {state, setDay, bookInterview, cancelInterview};
}
