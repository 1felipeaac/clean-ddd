import { AnswerQuestionsUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionsUseCase

describe('Create Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionsUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a answer', async () => {
  
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    
   
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    
  })
})
  
