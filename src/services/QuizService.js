import quizIndex from '../quizzes/quiz-index.json'

class QuizService {
  quizzes = {}

  constructor() {
    this.list().map((q) => this.quizzes[q.id] = require('../quizzes/' + q.file) )
  }

  list() {
    return quizIndex
  }

  loadQuiz(id) {
    return this.quizzes[id]
  }
}

export default QuizService;
