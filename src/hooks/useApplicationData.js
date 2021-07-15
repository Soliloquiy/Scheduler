import { useState, useEffect } from "react";
import axios from "axios";

//Look through appointments for day and check if interview is null
//If so, update the freeSpots counter
function getSpotsRemainingForDay(day, appointments) {
  let spotsForThisDay = day.appointments;
  let freeSpots = 0;
  //loop through appointment array in day object
  for (const spot of spotsForThisDay) {
    //look through all appointments(state.appointments) to check for interview is null
    if (appointments[spot].interview === null) {
      freeSpots++;
    }
  }
  return freeSpots;
}

//Look through each day and update the spots
function fillSpots(days, appointments) {
  const fillSpots = days.map((day) => ({
    ...day,
    spots: getSpotsRemainingForDay(day, appointments),
  }));
  return fillSpots;
}

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //updates value with useState method
  //pass spread of state, and value to function
  //use spread to preserve original state
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      //use prev to remove dependency on useEffect
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    //send interview data in body to API for update
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      //create new appointment object with updated interview object
      const appointment = {
        ...state.appointments[id],
        //replace interview:null in appointment
        interview: { ...interview },
      };

      //create new appointments object
      //purpose is to update interview object in appointments
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      //pass most recent version of appointments to function
      //after it has been updated with new interview info
      const days = fillSpots(state.days, appointments);

      //replace entire appointment property value with new appointment value
      return setState((state) => ({
        ...state,
        appointments,
        days,
      }));
    });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const days = fillSpots(state.days, appointments);

      setState((state) => ({
        ...state,
        appointments,
        days,
      }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
