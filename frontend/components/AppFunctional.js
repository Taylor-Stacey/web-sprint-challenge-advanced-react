import e from 'cors'
import { response } from 'msw'
import React from 'react'
import { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    message: "",
    email: "",
    steps: 0,
    x: 2,
    y: 2,
  });

  function changeCoordinates(xVal, yVal) {
    if (state.x + xVal > 3) {
      setState({
        ...state,
        message: "You can't go right"
      })
    }

    else if (state.x + xVal < 1) {
      setState({
        ...state,
        message: "You can't go left"
      })
    }

    else if (state.y + yVal > 3) {
      setState({
        ...state,
        message: "You can't go down"
      })
    }

    else if (state.y + yVal < 1) {
      setState({
        ...state,
        message: "You can't go up"
      })
    }

    else {
      setState({
        ...state,
        x: state.x + xVal,
        y: state.y + yVal,
        steps: state.steps + 1,
        message: ""
      })
    }
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setState({
      message: "",
      email: "",
      steps: 0,
      x: 2,
      y: 2,
    })
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setState({
      ...state,
      email: evt.target.value,
    })
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    fetch("http://localhost:9000/api/result", {
      method: "POST",
      headers: {
        Accept:
          "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((json) =>
        setState({
          ...state,
          message: json.message,
          email: "",
        })
      )
      .catch((error) => console.error(error));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${state.x}, ${state.y})`}</h3>
        {state.steps === 1 ? (
          <h3 id="steps">You moved 1 time</h3>
        ) : (
          <h3 id="steps">You moved {state.steps} times</h3>
        )}
      </div>
      <div id="grid">
        <div
          className={`square ${state.x === 1 && state.y === 1 ? "active" : ""}`}
        >
          {state.x === 1 && state.y === 1 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 2 && state.y === 1 ? "active" : ""}`}
        >
          {state.x === 2 && state.y === 1 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 3 && state.y === 1 ? "active" : ""}`}
        >
          {state.x === 3 && state.y === 1 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 1 && state.y === 2 ? "active" : ""}`}
        >
          {state.x === 1 && state.y === 2 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 2 && state.y === 2 ? "active" : ""}`}
        >
          {state.x === 2 && state.y === 2 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 3 && state.y === 2 ? "active" : ""}`}
        >
          {state.x === 3 && state.y === 2 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 1 && state.y === 3 ? "active" : ""}`}
        >
          {state.x === 1 && state.y === 3 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 2 && state.y === 3 ? "active" : ""}`}
        >
          {state.x === 2 && state.y === 3 ? "B" : ""}
        </div>

        <div
          className={`square ${state.x === 3 && state.y === 3 ? "active" : ""}`}
        >
          {state.x === 3 && state.y === 3 ? "B" : ""}
        </div>
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => changeCoordinates(-1, 0)}>LEFT</button>
        <button id="up" onClick={() => changeCoordinates(0, -1)}>UP</button>
        <button id="right" onClick={() => changeCoordinates(1, 0)}>RIGHT</button>
        <button id="down" onClick={() => changeCoordinates(0, 1)}>DOWN</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form>

        <input id="email" type="email" placeholder="type email" value={state.email} onChange={(evt) => onChange(evt)}></input>
        <input data-testid="submit" id="submit" type="submit" onClick={(evt) => onSubmit(evt)}></input>
    </form>
    </div >
  )
}
