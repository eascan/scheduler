import {useState} from "react";

// custom hook that will manage transitions to different component views

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value, replace = false) {
    if (!replace) {
      setMode(value);
      setHistory((prev) => [...prev, value]);
    } else {
      setMode(value);
    }
  }

  function back() {
    if (history.length >= 2) {
      setHistory((prev) => [...prev.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  }

  return {mode, transition, back};
}
