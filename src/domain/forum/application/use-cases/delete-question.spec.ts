import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionsUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
//system under test
let sut: DeleteQuestionsUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(question)
      
    await sut.execute({questionId: 'question-1', authorId: 'author-1'})

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)

  })

  it('should not be able to delete a question from another user', async () => {

    const question = makeQuestion({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('question-1'))

    inMemoryQuestionsRepository.create(question)
      
    await expect(() => {
      return sut.execute({
        questionId: 'question-1', authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)

  })

})

