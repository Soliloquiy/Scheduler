//Function that filters through days and returns appointments for that day
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.filter((apptday) => apptday.name === day)[0];
  if (!day || !foundDay) {
    return [];
  }

  const apptIds = foundDay.appointments;

  return apptIds.map((apptId) => state.appointments[apptId]);
}
//Function that formats the interview object into the format expected to be used when prop is called
export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewObj = {
    student: interview.student,
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}
//Function that filters through days and returns interviewers for that day
export function getInterviewersForDay(state, day) {
  const foundDay = state.days.filter((apptday) => apptday.name === day)[0];
  let interviewers = [];

  if (foundDay && foundDay.appointments) {
    interviewers = foundDay.interviewers.map(
      (interviewer) => state.interviewers[interviewer]
    );
  }

  return interviewers;
}
