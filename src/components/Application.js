import React from "react";

import { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

const axios = require('axios').default;

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jesus Jones",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Kamaru Usman",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "7pm",
  }
];




export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days')
    .then(function (response) {
      // handle success
      setDays([...response.data]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
  }, [])

  



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
  days={days}
  day={day}
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
        {appointments.map((appointment) => {
          //shortcut to spread keys for every single item
          //instead of <Appointment key={appointment.id} time={appointment.time} interview={appointment.interview} />
          return <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment key="last" time="9pm" />
        
      </section>
    </main>
  );
}

