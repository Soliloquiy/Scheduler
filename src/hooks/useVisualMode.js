import { useState } from "react";

export default function useVisualMode(initial) {
  //Create mode to represent different renders of appointment component
  const [mode, setMode] = useState(initial);
  //Create history to be able to transition backwards
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      //Remove latest history from end of array
      setHistory(history.slice(0, -1));
      //Assign mode to previous
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}
