import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswersUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
//system under test
let sut: DeleteAnswersUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {

    const answer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

    inMemoryAnswersRepository.create(answer)
      
    await sut.execute({answerId: 'answer-1', authorId: 'author-1'})

    expect(inMemoryAnswersRepository.items).toHaveLength(0)

  })

  it('should not be able to delete a answer from another user', async () => {

    const answer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

    inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: 'answer-1', authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
      
  })

})

