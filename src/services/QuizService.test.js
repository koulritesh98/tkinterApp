import QuizService from './QuizService'

describe(QuizService, () => {
  const service = new QuizService()

  it('lists all the available quizzes', () => {
    const list = service.list()
    expect(list.length).toBe(2)

    const first = list[0]
    expect(first.id).toBe(1)
    expect(first.name).toBe("Nerd Quiz")
    expect(first.file).toBe("nerd-quiz.json")
  })

  it('loads the quiz', () => {
    const questions = service.loadQuiz(1)
    expect(questions.length).toBe(8)

    const first = questions[0]
    expect(first.id).not.toBeNull()
    expect(first.timeLimitInSeconds).not.toBeNull()
    expect(first.text).not.toBeNull()
    expect(first.choices.length).not.toBeNull()
    expect(first.answer).not.toBeNull()
  })
})
