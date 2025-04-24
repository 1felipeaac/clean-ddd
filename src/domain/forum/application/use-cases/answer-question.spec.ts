import { AnswerQuestionsUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'
import { CreateQuestionsUseCase } from './create-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionsUseCase

describe('Create Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionsUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a answer', async () => {
  
    const {answer} = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })
  
    if (answer) {
      expect(answer.content).toEqual('Nova resposta')
      expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    }
  })
})
  
