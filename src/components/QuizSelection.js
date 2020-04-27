import React from 'react'
import styles from './QuizSelection.module.scss'

export default class QuizSelection extends React.Component {
  constructor(props) {
    super(props)

    this.index = props.index
    this.handleQuizSelection = props.handleQuizSelection

    this.handleOnClick = this.handleOnClick.bind(this)
    this.renderButton = this.renderButton.bind(this)
  }

  handleOnClick(e) {
    this.handleQuizSelection(e.target.value)
  }

  render() {
    return (
      <div className={styles.quizzes}>
        <div className={styles.text} >What quiz would you like to play?</div>
        <div className={styles.selection}>
          { this.index.map(this.renderButton) }
        </div>
      </div>
    )
  }

  renderButton(quiz) {
    return (
      <button className={styles.button} key={quiz.name} value={quiz.id} onClick={this.handleOnClick}>{quiz.name}</button>
    )
  }
}
