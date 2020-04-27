import React from 'react'

const Results = (props) => (
  <div>
    <p>MockedResults</p>
    { props.questions.map((q, i) => {
      return (
        <div key={q.id}>
          <p>Question{i}: {q.text}</p>
          <p>PlayerAnswer{i}: {q.playerAnswer ? q.playerAnswer : 'null'}</p>
        </div>
      )
    }) }
  </div>
)

export default Results;
