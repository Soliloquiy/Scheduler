export function getAppointmentsForDay(state, day) {


  //return name of each day found in state object
  // const foundDays = state.days.map(day => day.name);
  //returns empty array if day data is empty or not found
  // if (!day || !foundDays.includes(day)) return [];

  const foundDay = state.days.filter(apptday => apptday.name === day)[0];
  if (!day || !foundDay) {
    return [];
  };


  const apptIds = foundDay.appointments;



  return apptIds.map(apptId => state.appointments[apptId]);
  // return state.days
  //   .filter(appointment => appointment.name === day)[0]
  //   .appointments.map(apptId => state.appointments[apptId]);
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

export function getInterviewersForDay(state, day) {


  //return name of each day found in state object
  // const foundDays = state.days.map(day => day.name);
  //returns empty array if day data is empty or not found
  // if (!day || !foundDays.includes(day)) return [];

  const foundDay = state.days.filter(apptday => apptday.name === day)[0];
  let interviewers = [];
  
  if (foundDay && foundDay.appointments) {
    interviewers = foundDay.interviewers.map(interviewer => 
       state.interviewers[interviewer]
    )
  }
  
return interviewers;
}
