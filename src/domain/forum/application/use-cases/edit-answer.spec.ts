import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswersUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
//system under test
let sut: EditAnswersUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer', async () => {

    const answer = makeAnswer(
        {
            authorId: new UniqueEntityID('author-1')
        }, 
        new UniqueEntityID('answer-1'))

    inMemoryAnswersRepository.create(answer)
      
    await sut.execute({
        answerId: answer.id.toValue(), 
        authorId: 'author-1',
        content: 'Conteudo teste',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
        content: 'Conteudo teste',
    })

  })

  it('should not be able to edit a answer from another user', async () => {

    const answer = makeAnswer({authorId: new UniqueEntityID('author-1')}, new UniqueEntityID('answer-1'))

    inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toValue(), 
      authorId: 'author-2',
      content: 'Conteudo teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

})

