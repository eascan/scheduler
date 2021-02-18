export function getAppointmentsForDay(state, day) {
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
      const keys = Object.keys(state.appointments);
      // console.log("Every app for the day: ", app);
      for (const key of keys) {
        // console.log("everykey:", key);
        if (app == key) {
          // console.log(state.appointments.key);
          appointments.push(state.appointments[key]);
        }
      }
    }
  }
  return appointments;
}
