import React, { Component } from 'react'
import styles from './Question.module.scss'

export default class Question extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedChoice: null }

    this.handlePlayerAnswer = this.props.handlePlayerAnswer

    this.handleChoiceChange = this.handleChoiceChange.bind(this)
    this.renderChoice = this.renderChoice.bind(this)
    this.choiceClassNames = this.choiceClassNames.bind(this)
  }

  handleChoiceChange(e) {
    this.setState({selectedChoice: e.target.value})

    this.handlePlayerAnswer(e.target.value)
  }

  choiceClassNames(choice) {
    if (this.state.selectedChoice === choice) {
      return styles.choice + " " + styles.selected
    }

    return styles.choice
  }

  render() {
    const question = this.props.question

    return (
      <div className={styles.question}>
        <div className={styles.text}>{question.text}</div>
        <form className={styles.choices} onSubmit={this.handleSubmit} data-testid="form">
          { question.choices.map(this.renderChoice) }
        </form>
      </div>
    )
  }

  renderChoice(choice) {
    return (
      <label className={this.choiceClassNames(choice)} key={choice} htmlFor={choice}>
        <input id={choice} name="answer" type="radio" value={choice} onChange={this.handleChoiceChange} />
        {choice}
      </label>
    )
  }
}
