import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { CreateQuestionsUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: CreateQuestionsUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
      
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteudo da pergunta',
    })
  
    expect(result.isRight()).toBe(true)
    
    expect(result.value?.question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    
  })

})

