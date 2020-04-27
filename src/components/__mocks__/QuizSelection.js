import React from 'react'

const QuizSelection = (props) => (
  <div>
    <div>MockedQuizSelection</div>
    <button onClick={() => props.handleQuizSelection(1)}>Select</button>
  </div>
)

export default QuizSelection;
