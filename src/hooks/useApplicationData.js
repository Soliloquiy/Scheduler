import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function useApplicationData() {

  //Replace below with single state that handles all useStates
    // const [day, setDay] = useState("Monday");
    // const [days, setDays] = useState([]);
  
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
  
    
  
  
    //updates value with useState method
    //pass spread of state, and value to function
    //use spread to preserve original state
    const setDay = day => setState({ ...state, day });
    //use prev to remove dependency on useEffect
  
  
  
    
    //Do not want dependency on state (only render once)
    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]).then(response => {
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      });
    }, []);
  
  
    function bookInterview(id, interview) {
  
      //send interview data in body to API for update
      return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        //create new appointment object with updated interview object
        const appointment = {
          ...state.appointments[id],
          //replace interview:null in appointment
          interview: { ...interview }
        };
        
        //create new appointments object
        //purpose is to update interview object in appointments
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        //replace entire appointment property value with new appointment value
        return setState(state => ({
          ...state,
          appointments
        }));
      })
      
    }
  
    function cancelInterview(id, interview) {
  
      return axios.delete(`/api/appointments/${id}`, { interview }).then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
  
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
  
        setState(state => ({
          ...state,
          appointments
        }));
      });
    };

    return { state, setDay, bookInterview, cancelInterview };
}