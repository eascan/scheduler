import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(value, replace = false) {
    if (!replace) {
      setMode(value);
      setHistory([...history, value]);
    } else {
      setMode(value);
    }
  }

  function back() {
    if (history.length >= 2) {
      setHistory([...history.slice(0, -1)]);
      setMode(history[history.length - 2]);
    }
  }

  return {mode, transition, back};
}
