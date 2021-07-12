import React from "react";

import "components/Application.scss";

//Do not use curly braces when importing react default functions

import DayList from "./DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay } from 'helpers/selectors.js';

import { getInterview } from "helpers/selectors";

import { getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";





export default function Application(props) {

  const { 
    state, 
    setDay, 
    bookInterview, 
    cancelInterview 
  } = useApplicationData();

  
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {


    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="9pm" />

      </section>
    </main>
  );
}

