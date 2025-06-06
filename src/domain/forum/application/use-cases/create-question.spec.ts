import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { CreateQuestionsUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentsRepository } from 'test/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: CreateQuestionsUseCase

describe('Create Question', () => {
  beforeEach(() => {
    let inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new CreateQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
      
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteudo da pergunta',
      attachmentsIds: ['1', '2']
    })
  
    expect(result.isRight()).toBe(true)
    
    expect(result.value?.question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId: new UniqueEntityID('1')}),
      expect.objectContaining({attachmentId: new UniqueEntityID('2')})
    ])
    
  })

})

