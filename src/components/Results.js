import React, { Component } from 'react'

class Results extends Component {
  constructor(props) {
    super(props)

    this.questions = this.props.questions
  }

  answeredCorrectly(q) {
    return q.answer === q.playerAnswer
  }

  render() {
    return (
      <div>
        { this.questions.map((q, i) =>
          <p key={q.id}>Question {i}: { this.answeredCorrectly(q) ? 'Correct!' : 'Incorrect' }</p>
        ) }
      </div>
    )
  }
}

export default Results;
