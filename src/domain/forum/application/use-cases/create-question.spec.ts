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
      
    const {question} = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteudo da pergunta',
    })
  
    if (question) {
      expect(question.id).toBeTruthy()
      expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
    }
  })

})

