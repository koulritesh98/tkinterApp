import React from 'react';
import styles from './App.module.scss';
import Quiz from './components/Quiz';
import QuizSelection from './components/QuizSelection';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.service = props.quizService
    this.state = {
      quizIndex: this.service.list(),
      selectedQuiz: null
    }

    this.handleQuizSelection = this.handleQuizSelection.bind(this)
  }

  handleQuizSelection(id) {
    const selectedQuiz = this.service.loadQuiz(id)
    this.setState({selectedQuiz})
  }

  render() {
    this.component = <QuizSelection index={this.state.quizIndex} handleQuizSelection={this.handleQuizSelection} />

    this.selectedQuiz = this.state.selectedQuiz
    if (this.selectedQuiz) {
      this.component = <Quiz questions={this.selectedQuiz} />
    }

    return (
      <div className={styles.app}>
        <header className={styles.header}>
          PubQuiz
        </header>
        <main className={styles.main}>
          { this.component }
        </main>
      </div>
    )
  }
}
