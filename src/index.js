import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import QuizService from './services/QuizService'

const quizService = new QuizService()

ReactDOM.render(<App quizService={quizService} />, document.getElementById('root'));
