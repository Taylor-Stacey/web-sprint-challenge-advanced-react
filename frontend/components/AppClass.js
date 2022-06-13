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

  // getXY = (num) => {
  //   // It it not necessary to have a state to track the coordinates.
  //   // It's enough to know what index the "B" is at, to be able to calculate them.

  //   if(this.state.index = 0) {
  //     return" Coordinates (1,1)"
  //   }
  //   if(this.state.index = 1) {
  //     return (1,2)
  //   }
  //   if(this.state.index = 2) {
  //     return (1,3)
  //   }
  //   if(this.state.index = 3) {
  //     return (2,1)
  //   }
  //   if(this.state.index === 4) {
  //     return (2,2)
  //   }
  //   if(this.state.index = 5) {
  //     return (2,3)
  //   }
  //   if(this.state.index = 6) {
  //     return (3,1)
  //   }
  //   if(this.state.index = 7) {
  //     return (3,2)
  //   }
  //   if(this.state.index = 8) {
  //     return (3,3)
  //   }
  // }

  // getXYMessage = () => {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(...initialState)
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
          <h3 id="coordinates">Coordinates {this.getXY(this.state.index)}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
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
