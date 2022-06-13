import e from 'cors'
import { response } from 'msw'
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
// const initialIndex = 4 // the index the "B" is at


const initialState = {
  message: initialMessage,
  email: initialEmail,
  steps: initialSteps,
  x: 2,
  y: 2
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  state = {
    ...initialState
  }

  changeCoordinates = (xVal, yVal) => {
    if (this.state.x + xVal > 3) {
      this.setState({
        ...this.state,
        message: "You can't go right"
      })
    }

    else if (this.state.x + xVal < 1) {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    }

    else if (this.state.y + yVal > 3) {
      this.setState({
        ...this.state,
        message: "You can't go down"
      })
    }

    else if (this.state.y + yVal < 1) {
      this.setState({
        ...this.state,
        message: "You can't go up"
      })
    }

    else {
      this.setState({
        ...this.state,
        x: this.state.x + xVal,
        y: this.state.y + yVal,
        steps: this.state.steps + 1,
        message: ""
      })
    }
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ ...initialState })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

    fetch("http://localhost:9000/api/result", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(json => this.setState({
        ...this.state,
        message: json.message
      }))
      .catch(error => console.error(error));
    this.setState({
      ...this.state,
      email: ""
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          {this.state.steps === 1 ? <h3 id="steps">You moved 1 time</h3> : <h3 id="steps">You moved {this.state.steps} times</h3>}
        </div>
        <div id="grid">
          <div className={`square ${this.state.x === 1 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 1 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 2 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 1 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 3 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 1 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 1 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 2 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 2 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 2 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 3 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 2 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 1 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 3 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 2 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 3 ? "B" : ""}</div>
          <div className={`square ${this.state.x === 3 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 3 ? "B" : ""}</div>

        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.changeCoordinates(-1, 0)}>LEFT</button>
          <button id="up" onClick={() => this.changeCoordinates(0, -1)}>UP</button>
          <button id="right" onClick={() => this.changeCoordinates(1, 0)}>RIGHT</button>
          <button id="down" onClick={() => this.changeCoordinates(0, 1)}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={evt => this.onChange(evt)}></input>
          <input id="submit" type="submit" onClick={evt => this.onSubmit(evt)}></input>
        </form>
      </div>
    )
  }
}
